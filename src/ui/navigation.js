import { bindWallpaperMode } from './wallpaper.js';
import { reducedMotion } from '../core/math.js';
import { bindBodyPicking } from './picking.js';
import { createDestinations } from './destinations.js';
import { createTrajectoryPanel } from './trajectory-panel.js';

export function bindNavigationUI({ renderer, camera, world, navigation, assets, toast, onPick, controls, wallpaperView, setSpaceColor }) {
  const $ = id => document.getElementById(id);
  const { flyTo, zoom } = navigation;
  let paused = reducedMotion, speed = 1, orbitsVisible = true, labelsVisible = true;
  let destinations, trajectoryPanel;

  function setPaused(value) {
    paused = value;
    $('pause').innerHTML = paused
      ? '<svg viewBox="0 0 24 24"><path d="m9 5 10 7-10 7Z"/></svg>'
      : '<svg viewBox="0 0 24 24"><path d="M9 5v14M15 5v14"/></svg>';
    $('pause').setAttribute('aria-label', paused ? 'Tiếp tục chuyển động của thiên thể' : 'Tạm dừng chuyển động của thiên thể');
    $('pause').title = paused ? 'Tiếp tục (phím cách)' : 'Tạm dừng (phím cách)';
  }

  function updateStage(mode) {
    const { activeGalaxyId, activeSystemId } = navigation.getState();
    document.querySelectorAll('[data-view]').forEach(button => {
      const active = button.dataset.view === mode && (mode === 'local-group'
        || (activeGalaxyId === 'galaxy' && (mode === 'galaxy' || activeSystemId === 'solar')));
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    destinations?.update();
    trajectoryPanel?.update();
    $('toggle-trajectories').setAttribute('aria-pressed', String(mode === 'trajectory'));
  }

  function restoreState(settings) {
    setPaused(settings.paused);
    speed = settings.speed;
    labelsVisible = settings.labelsVisible;
    $('speed').firstChild.textContent = speed + '×';
    $('toggle-orbits').setAttribute('aria-pressed', String(orbitsVisible));
    $('toggle-labels').setAttribute('aria-pressed', String(labelsVisible));
  }

  function updateHud() {
    const deployment = world.jwst.getState();
    $('jwst-deploy').textContent = deployment.targetExpanded ? 'Thu gọn mô hình ↙' : 'Mở rộng mô hình ↗';
    $('jwst-deploy').setAttribute('aria-pressed', String(deployment.targetExpanded));
    $('jwst-deployment-status').textContent = deployment.animating
      ? `${deployment.targetExpanded ? 'Đang mở rộng' : 'Đang thu gọn'} · ${deployment.phase} · Hoạt ảnh triển khai được rút gọn để minh họa`
      : deployment.progress === 1 ? '18 tấm gương cong · 5 lớp màng · Thu gọn chỉ để minh họa quá trình triển khai' : 'Mô hình đã thu gọn · Phát lại triển khai giản lược, không phải thao tác trên quỹ đạo';

    const { stage, focusBody, activeGalaxyId, activeSystemId } = navigation.getState();
    updateStage(stage);
    if (stage === 'trajectory') {
      $('view-caption').textContent = 'Quỹ đạo chuyển động của Hệ Mặt Trời';
      $('view-distance').textContent = world.motionTrajectories.getState().referenceFrame === 'solar'
        ? 'Theo Mặt Trời · Quan sát hành tinh quay quanh' : 'Theo Ngân Hà · Quan sát chuyển động tiến và quay quanh';
    } else if (stage === 'local-group') {
      $('view-caption').textContent = world.getData('local-group').vi;
      $('view-distance').textContent = `${world.galaxyDefinitions.length} thiên hà · Nhấp để bắt đầu hành trình liên sao`;
    } else if (stage === 'galaxy') {
      $('view-caption').textContent = 'Toàn cảnh ' + world.getData(activeGalaxyId).vi;
      $('view-distance').textContent = 'Khám phá thiên thể · Tiếp tục thu nhỏ để mở Danh mục thiên hà';
    } else if (stage === 'solar') {
      const hasPlanets = [...world.bodies.values()].some(body => body.parentStarId === activeSystemId);
      $('view-caption').textContent = activeSystemId === 'solar' ? 'Toàn cảnh Hệ Mặt Trời'
        : (hasPlanets ? 'Hệ ' : 'Vùng quanh ') + world.getData(activeSystemId).vi;
      $('view-distance').textContent = activeSystemId === 'solar' ? 'Quỹ đạo của tám hành tinh'
        : hasPlanets ? 'Sao chủ và các hành tinh · Quỹ đạo mang tính minh họa' : 'Vùng quanh ngôi sao · Tiếp tục thu nhỏ để đến thiên hà';
    } else {
      const body = world.getData(focusBody);
      $('view-caption').textContent = focusBody === 'earth' ? 'Trái Đất · Quỹ đạo gần' : (focusBody === 'iss' ? 'Cận cảnh ' : 'Quan sát ') + body.vi;
      if (focusBody === 'jwst') {
        $('view-distance').textContent = 'Gần điểm L2 Mặt Trời–Trái Đất · Tư thế, quỹ đạo và tỷ lệ mang tính minh họa';
        return;
      }
      if (body.kind === 'spacecraft') {
        $('view-distance').textContent = 'Tàu thăm dò không gian liên sao · Vị trí và đường bay mang tính minh họa';
        return;
      }
      if (body.parentGalaxy) {
        $('view-distance').textContent = body.kind === 'black-hole' ? 'Bóng hố đen và đĩa bồi tụ · Minh họa nghệ thuật'
          : body.kind === 'star' ? 'Bề mặt sao và vành nhật hoa mang tính minh họa'
          : body.modelStatus === 'illustration' ? 'Minh họa sáng tạo · Chưa xác nhận tồn tại' : 'Hành tinh đã xác nhận · Bề mặt minh họa';
        return;
      }
      const surface = Math.max(0, camera.position.distanceTo(world.getPosition(focusBody)) - (body.r || 1));
      const kilometers = Math.round(surface / Math.max(.001, body.r) * Number((body.diameter || '12742').replaceAll(',', '')) / 2);
      $('view-distance').textContent = focusBody === 'iss' ? 'Quỹ đạo thấp của Trái Đất' : `Cách bề mặt khoảng ${kilometers.toLocaleString('vi-VN')} km`;
    }
  }

  async function fullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
      else toast('Trình duyệt này chưa hỗ trợ toàn màn hình, hãy dùng chế độ toàn màn hình của trình duyệt');
    } catch {
      toast('Chưa bật được toàn màn hình, hãy dùng chế độ toàn màn hình của trình duyệt');
    }
  }

  destinations = createDestinations({ world, navigation, assets });
  trajectoryPanel = createTrajectoryPanel({ world, navigation });
  $('toggle-trajectories').onclick = () => flyTo(navigation.getState().stage === 'trajectory' ? 'solar' : 'trajectory');
  document.querySelectorAll('[data-view]').forEach(button => button.onclick = () => flyTo(button.dataset.view));
  $('home').onclick = event => { event.preventDefault(); flyTo('earth'); };
  $('night-view').onclick = () => flyTo('earth', { night: true });
  $('station-view').onclick = () => flyTo('iss');
  $('jwst-visit').onclick = () => flyTo('jwst');
  $('jwst-deploy').onclick = () => world.jwst.setDeployment(!world.jwst.getState().targetExpanded, { immediate: reducedMotion });
  $('zoom-in').onclick = () => zoom(.72);
  $('zoom-out').onclick = () => zoom(1.45);
  $('pause').onclick = () => setPaused(!paused);
  $('speed').onclick = () => {
    const speeds = [.25, 1, 5, 20];
    speed = speeds[(speeds.indexOf(speed) + 1) % speeds.length];
    $('speed').firstChild.textContent = speed + '×';
    toast('Tốc độ thời gian ' + speed + '×');
  };
  function setOrbitsVisible(value) {
    orbitsVisible = value;
    $('toggle-orbits').setAttribute('aria-pressed', String(orbitsVisible));
  }
  $('toggle-orbits').onclick = () => wallpaper.configure({orbitsVisible:!orbitsVisible});
  $('toggle-labels').onclick = () => {
    labelsVisible = !labelsVisible;
    $('toggle-labels').setAttribute('aria-pressed', String(labelsVisible));
  };
  const wallpaper = bindWallpaperMode(renderer.domElement, { world, controls, navigation, view: wallpaperView, setSpaceColor, setOrbitsVisible });
  $('fullscreen').onclick = fullscreen;
  $('help-button').onclick = () => $('help-dialog').showModal();
  $('credits-button').onclick = () => $('credits-dialog').showModal();
  document.querySelectorAll('[data-close]').forEach(button => button.onclick = () => button.closest('dialog').close());
  document.querySelectorAll('dialog').forEach(dialog => dialog.onclick = event => {
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    }
  });
  addEventListener('keydown', event => {
    if (document.querySelector('dialog[open]')) return;
    const tag = event.target.tagName;
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag) || event.target.isContentEditable) return;
    if (wallpaper.active) {
      if (['i', 'Escape'].includes(event.key)) wallpaper.exit();
      if (['ArrowLeft','ArrowUp','ArrowRight','ArrowDown'].includes(event.key)) { event.preventDefault(); wallpaper.next(['ArrowRight','ArrowDown'].includes(event.key) ? 1 : -1); }
      return;
    }
    if (['BUTTON', 'A'].includes(tag) && event.code === 'Space') return;
    if (event.code === 'Space') { event.preventDefault(); setPaused(!paused); }
    if (event.key === '+' || event.key === '=') zoom(.8);
    if (event.key === '-') zoom(1.25);
    if (event.key.toLowerCase() === 'h') flyTo('earth');
    if (event.key.toLowerCase() === 'f') fullscreen();
    if (event.key.toLowerCase() === 'i') {
      wallpaper.toggle();
    }
    if (event.key === 'Escape') wallpaper.exit();
    if (event.key === '?') $('help-dialog').showModal();
  });
  bindBodyPicking({ renderer, camera, world, navigation, onPick, isEnabled: () => !wallpaper.active });
  setPaused(paused);

  return { wallpaper, getState: () => ({ paused, speed, orbitsVisible, labelsVisible }), setPaused, restoreState, updateStage, updateHud };
}
