import { mobile, reducedMotion } from '../core/math.js';

export function createInfoPanel({ getData }) {
  const $ = id => document.getElementById(id);

  function update(id) {
    const data = getData(id);
    $('info-category').textContent = data.type;
    $('info-en').textContent = data.en;
    $('info-panel').classList.toggle('deep-space-info', Boolean(data.kind || data.parentGalaxy));
    $('info-panel').classList.toggle('black-hole-info', data.kind === 'black-hole');
    $('info-name').classList.toggle('long-name', data.vi.length >= 11
      || (data.vi.length >= 9 && Boolean(data.kind || data.parentGalaxy)));
    $('info-name').textContent = data.vi;
    const index = document.createElement('span');
    index.className = 'object-index';
    index.textContent = data.index;
    $('info-name').append(index);
    $('info-description').textContent = data.desc;
    $('stat-label-1').textContent = data.stat1 || 'Đường kính trung bình';
    $('stat-label-2').textContent = data.stat2 || 'Chu kỳ quỹ đạo';
    $('stat-value-1').replaceChildren(document.createTextNode(data.diameter));
    const unit1 = document.createElement('small');
    unit1.textContent = ' ' + (data.unit1 ?? 'km');
    $('stat-value-1').append(unit1);
    $('stat-value-2').replaceChildren(document.createTextNode(data.value2));
    const unit2 = document.createElement('small');
    unit2.textContent = ' ' + data.unit2;
    $('stat-value-2').append(unit2);
    $('jwst-actions').hidden = id !== 'jwst';
    $('info-panel').classList.toggle('jwst-info', id === 'jwst');
    $('earth-actions').style.display = id === 'earth' || id === 'iss' ? '' : 'none';
    $('observation-text').textContent = data.kind === 'spacecraft' ? 'Vị trí, tư thế và đường bay mang tính minh họa'
      : data.kind === 'galaxy' || data.kind === 'group' ? 'Cấu trúc và khoảng cách thiên hà mang tính minh họa'
      : data.kind === 'black-hole' ? 'Bóng hố đen, đĩa bồi tụ và vành sáng là minh họa nghệ thuật'
      : id === 'trajectory' ? 'Hệ quy chiếu, khoảng cách và thời gian mang tính minh họa'
      : id === 'solar' ? 'Tám hành tinh · Đang chuyển động trên quỹ đạo' : 'Đang theo dõi ' + data.vi;
    const evidence = $('info-evidence');
    evidence.hidden = !data.modelStatus;
    evidence.dataset.status = data.modelStatus || '';
    evidence.textContent = data.modelStatus === 'illustration' ? 'Minh họa sáng tạo · Chưa xác nhận tồn tại'
      : data.modelStatus === 'candidate' ? 'Thiên thể ứng viên · Đang chờ xác nhận'
      : data.kind === 'spacecraft' ? 'Tàu thăm dò có thật · Mô hình minh họa'
      : data.kind === 'galaxy' || data.kind === 'group' ? 'Thiên hà có thật · Cấu trúc minh họa' : 'Thiên thể đã biết · Bề ngoài minh họa';
    const source = $('info-source');
    source.hidden = !data.sourceUrl;
    if (data.sourceUrl) {
      source.href = data.sourceUrl;
      source.textContent = (data.modelStatus === 'illustration' ? 'Tư liệu nền cho phần minh họa' : data.sourceLabel || 'Tư liệu thiên thể') + ' ↗';
    }
    document.querySelectorAll('.planet-button').forEach(button => {
      button.classList.toggle('active', button.dataset.id === id);
      button.setAttribute('aria-pressed', String(button.dataset.id === id));
    });
    const active = document.querySelector('.planet-button.active');
    if (active && mobile()) active.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'nearest', inline: 'center' });
  }

  return { update };
}
