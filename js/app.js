/**
 * WEDDING INVITATION & BLOG LOGIC
 * High interactivity, Audio Player, Petal Canvas, RSVP & Guestbook
 */

document.addEventListener('DOMContentLoaded', () => {
  const config = window.WEDDING_CONFIG || {};

  // 1. CÁ NHÂN HÓA TÊN KHÁCH MỜI TỪ URL
  initGuestPersonalization();

  // 2. KHỞI TẠO NỘI DUNG TỪ CONFIG
  populateDataFromConfig(config);

  // 3. ĐỒNG HỒ ĐẾM NGƯỢC (COUNTDOWN TIMER)
  initCountdown(config.wedding?.dateTime || "2026-11-28T11:00:00");

  // 4. HIỆU ỨNG CÁNH HOA RƠI (PETALS ANIMATION)
  initPetalsCanvas();

  // 5. TRÌNH PHÁT NHẠC (AUDIO & WEB AUDIO PIANO SYNTHESIZER)
  initMusicPlayer(config.audio);

  // 6. ALBUM ẢNH & LIGHTBOX MODAL
  initGallery(config.gallery || []);

  // 7. SỔ LƯU BÚT (GUESTBOOK)
  initGuestbook(config.sampleWishes || []);

  // 8. BIỂU MẪU XÁC NHẬN THAM DỰ (RSVP FORM)
  initRSVP();

  // 9. NÚT SAO CHÉP TÀI KHOẢN NGÂN HÀNG & MỪNG CƯỚI
  initCopyBank();

  // 10. ĐIỀU HƯỚNG VÀ CUỘN TRANG
  initNavigation();

  // 11. XỬ LÝ MỞ THIỆP (ENVELOPE SCREEN)
  initEnvelopeScreen();
});

/* ==========================================================================
   1. GUEST PERSONALIZATION
   ========================================================================== */
function initGuestPersonalization() {
  const urlParams = new URLSearchParams(window.location.search);
  const guestName = urlParams.get('guest') || urlParams.get('to') || urlParams.get('name') || "Quý Khách & Người Thương";

  const guestElements = document.querySelectorAll('.dynamic-guest-name');
  guestElements.forEach(el => {
    el.textContent = guestName;
  });

  const envelopeGuestEl = document.getElementById('envelope-guest-name');
  if (envelopeGuestEl) {
    envelopeGuestEl.textContent = guestName;
  }
}

/* ==========================================================================
   2. POPULATE DATA FROM CONFIG
   ========================================================================== */
function populateDataFromConfig(config) {
  if (!config.groom || !config.bride) return;

  // Tên cô dâu chú rể
  document.querySelectorAll('.groom-name').forEach(el => el.textContent = config.groom.shortName);
  document.querySelectorAll('.groom-fullname').forEach(el => el.textContent = config.groom.fullName);
  document.querySelectorAll('.bride-name').forEach(el => el.textContent = config.bride.shortName);
  document.querySelectorAll('.bride-fullname').forEach(el => el.textContent = config.bride.fullName);

  // Chú rể
  const groomAvatar = document.getElementById('groom-avatar');
  if (groomAvatar && config.groom.avatar) groomAvatar.src = config.groom.avatar;
  const groomBio = document.getElementById('groom-bio');
  if (groomBio) groomBio.textContent = config.groom.bio;
  const groomFather = document.getElementById('groom-father');
  if (groomFather) groomFather.textContent = config.groom.father;
  const groomMother = document.getElementById('groom-mother');
  if (groomMother) groomMother.textContent = config.groom.mother;

  // Cô dâu
  const brideAvatar = document.getElementById('bride-avatar');
  if (brideAvatar && config.bride.avatar) brideAvatar.src = config.bride.avatar;
  const brideBio = document.getElementById('bride-bio');
  if (brideBio) brideBio.textContent = config.bride.bio;
  const brideFather = document.getElementById('bride-father');
  if (brideFather) brideFather.textContent = config.bride.father;
  const brideMother = document.getElementById('bride-mother');
  if (brideMother) brideMother.textContent = config.bride.mother;

  // Thông tin ngày cưới
  const solarDate = document.getElementById('solar-date-str');
  if (solarDate) solarDate.textContent = config.wedding.solarDateString;
  const lunarDate = document.getElementById('lunar-date-str');
  if (lunarDate) lunarDate.textContent = config.wedding.lunarDateString;

  // Render Love Story
  renderLoveStory(config.loveStory || []);

  // Render Events
  renderEvents(config.events || []);

  // Render Dress Code
  renderDressCode(config.dressCode);

  // Render Banking
  renderBanking(config.groom.bank, config.bride.bank);
}

function renderLoveStory(storyList) {
  const container = document.getElementById('timeline-container');
  if (!container) return;
  container.innerHTML = storyList.map((item, index) => {
    const isEven = index % 2 === 0;
    return `
      <div class="timeline-item ${isEven ? 'left' : 'right'}">
        <div class="timeline-node"></div>
        <div class="story-card">
          <span class="story-year">${item.year}</span>
          <h3 class="story-title">${item.title}</h3>
          <img src="${item.image}" alt="${item.title}" class="story-img" loading="lazy" />
          <p class="story-desc">${item.description}</p>
        </div>
      </div>
    `;
  }).join('');
}

function renderEvents(eventsList) {
  const container = document.getElementById('events-container');
  if (!container) return;
  container.innerHTML = eventsList.map(ev => {
    return `
      <div class="event-card">
        <div class="event-icon-box">
          <i class="fa-solid ${ev.icon || 'fa-heart'}"></i>
        </div>
        <h3 class="event-title">${ev.title}</h3>
        <div class="event-time"><i class="fa-regular fa-clock"></i> ${ev.time}</div>
        <div class="event-location">${ev.locationName}</div>
        <p class="event-address">${ev.address}</p>
        <div class="event-actions">
          <a href="${ev.mapUrl}" target="_blank" rel="noopener" class="btn btn-primary" style="padding: 0.6rem 1.4rem; font-size: 0.88rem;">
            <i class="fa-solid fa-map-location-dot"></i> Chỉ đường
          </a>
          <button class="btn btn-outline" style="padding: 0.6rem 1.2rem; font-size: 0.88rem;" onclick="addToCalendar('${ev.title}', '${ev.time}', '${ev.address}')">
            <i class="fa-regular fa-calendar-plus"></i> Lưu lịch
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function renderDressCode(dressCode) {
  if (!dressCode) return;
  const container = document.getElementById('dresscode-palette');
  const noteEl = document.getElementById('dresscode-note');
  if (noteEl) noteEl.textContent = dressCode.note;
  if (!container) return;

  container.innerHTML = dressCode.colors.map(c => `
    <div class="color-swatch-item">
      <div class="color-circle" style="background-color: ${c.hex}; border: 2px solid ${c.border || '#ccc'};"></div>
      <span class="color-name">${c.name}</span>
    </div>
  `).join('');
}

function renderBanking(groomBank, brideBank) {
  const groomBox = document.getElementById('groom-banking');
  if (groomBox && groomBank) {
    groomBox.innerHTML = `
      <span class="gift-role-tag">Tài khoản Chú Rể</span>
      <div class="gift-qr-box">
        <img src="${groomBank.qrUrl}" alt="QR Chú Rể" loading="lazy" />
      </div>
      <div class="bank-detail-item"><strong>Ngân hàng:</strong> ${groomBank.bankName}</div>
      <div class="bank-detail-item"><strong>Chủ tài khoản:</strong> ${groomBank.accountName}</div>
      <div class="bank-detail-item">
        <strong>Số tài khoản:</strong> <span class="bank-acc-number">${groomBank.accountNumber}</span>
      </div>
      <button class="copy-btn" onclick="copyToClipboard('${groomBank.accountNumber}', 'Đã sao chép STK Chú Rể')">
        <i class="fa-regular fa-copy"></i> Sao chép số tài khoản
      </button>
    `;
  }

  const brideBox = document.getElementById('bride-banking');
  if (brideBox && brideBank) {
    brideBox.innerHTML = `
      <span class="gift-role-tag" style="background: linear-gradient(135deg, #d4af37 0%, #c06c84 100%);">Tài khoản Cô Dâu</span>
      <div class="gift-qr-box">
        <img src="${brideBank.qrUrl}" alt="QR Cô Dâu" loading="lazy" />
      </div>
      <div class="bank-detail-item"><strong>Ngân hàng:</strong> ${brideBank.bankName}</div>
      <div class="bank-detail-item"><strong>Chủ tài khoản:</strong> ${brideBank.accountName}</div>
      <div class="bank-detail-item">
        <strong>Số tài khoản:</strong> <span class="bank-acc-number">${brideBank.accountNumber}</span>
      </div>
      <button class="copy-btn" onclick="copyToClipboard('${brideBank.accountNumber}', 'Đã sao chép STK Cô Dâu')">
        <i class="fa-regular fa-copy"></i> Sao chép số tài khoản
      </button>
    `;
  }
}

/* ==========================================================================
   3. COUNTDOWN TIMER
   ========================================================================== */
function initCountdown(targetDateStr) {
  const targetDate = new Date(targetDateStr).getTime();
  const daysEl = document.getElementById('countdown-days');
  const hoursEl = document.getElementById('countdown-hours');
  const minutesEl = document.getElementById('countdown-minutes');
  const secondsEl = document.getElementById('countdown-seconds');

  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   4. FALLING PETALS CANVAS ANIMATION
   ========================================================================== */
let petalsActive = true;
function initPetalsCanvas() {
  const canvas = document.getElementById('petals-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petalsCount = 28;
  const petals = [];

  for (let i = 0; i < petalsCount; i++) {
    petals.push({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 8 + 10,
      speedX: Math.random() * 2 - 1,
      speedY: Math.random() * 1.5 + 1.2,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 2 - 1,
      opacity: Math.random() * 0.5 + 0.35,
      color: Math.random() > 0.4 ? '#f7cbd4' : '#eed0d8'
    });
  }

  function render() {
    if (!petalsActive) {
      ctx.clearRect(0, 0, width, height);
      requestAnimationFrame(render);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < petalsCount; i++) {
      const p = petals[i];
      p.x += p.speedX + Math.sin(p.y * 0.01) * 0.8;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;

      if (p.y > height + 20) {
        p.y = -20;
        p.x = Math.random() * width;
      }
      if (p.x > width + 20) p.x = -20;
      if (p.x < -20) p.x = width + 20;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      // Vẽ hình cánh hoa mềm mại
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, 0, 0, p.size * 1.5);
      ctx.bezierCurveTo(-p.size, 0, -p.size / 2, -p.size / 2, 0, 0);
      ctx.fill();

      ctx.restore();
    }

    requestAnimationFrame(render);
  }

  render();

  // Nút bật/tắt cánh hoa
  const togglePetalBtn = document.getElementById('toggle-petals-btn');
  if (togglePetalBtn) {
    togglePetalBtn.addEventListener('click', () => {
      petalsActive = !petalsActive;
      togglePetalBtn.innerHTML = petalsActive
        ? '<i class="fa-solid fa-fan"></i>'
        : '<i class="fa-regular fa-circle-xmark"></i>';
      showToast(petalsActive ? 'Đã bật hiệu ứng cánh hoa' : 'Đã tắt hiệu ứng cánh hoa');
    });
  }
}

/* ==========================================================================
   5. MUSIC PLAYER & WEB AUDIO PIANO SYNTHESIZER
   ========================================================================== */
let isPlaying = false;
let audioContext = null;
let synthTimer = null;
let htmlAudio = null;

function initMusicPlayer(audioConfig) {
  const musicBtn = document.getElementById('music-toggle-btn');
  if (!musicBtn) return;

  if (audioConfig && audioConfig.src && audioConfig.src.trim() !== '') {
    htmlAudio = new Audio(audioConfig.src);
    htmlAudio.loop = true;
  }

  musicBtn.addEventListener('click', () => {
    toggleMusic();
  });
}

function toggleMusic() {
  const musicBtn = document.getElementById('music-toggle-btn');
  if (!isPlaying) {
    playMusic();
  } else {
    stopMusic();
  }
}

function playMusic() {
  const musicBtn = document.getElementById('music-toggle-btn');
  if (htmlAudio) {
    htmlAudio.play().then(() => {
      isPlaying = true;
      if (musicBtn) musicBtn.classList.add('playing');
    }).catch(err => {
      // Fallback sang Web Audio piano
      startWebAudioPiano();
    });
  } else {
    startWebAudioPiano();
  }
}

function stopMusic() {
  const musicBtn = document.getElementById('music-toggle-btn');
  if (htmlAudio) {
    htmlAudio.pause();
  }
  if (synthTimer) {
    clearInterval(synthTimer);
    synthTimer = null;
  }
  isPlaying = false;
  if (musicBtn) musicBtn.classList.remove('playing');
}

// BỘ TỔNG HỢP GIAI ĐIỆU PIANO CƯỚI LÃNG MẠN (CANON IN D ARPEGGIO CHORDS)
function startWebAudioPiano() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!audioContext) {
      audioContext = new AudioCtx();
    }
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    isPlaying = true;
    const musicBtn = document.getElementById('music-toggle-btn');
    if (musicBtn) musicBtn.classList.add('playing');

    // Chùm nốt Canon in D nhẹ nhàng (Tần số Hz)
    const chords = [
      [293.66, 369.99, 440.00, 587.33], // D major
      [220.00, 277.18, 329.63, 440.00], // A major
      [246.94, 293.66, 369.99, 493.88], // B minor
      [185.00, 220.00, 277.18, 369.99], // F# minor
      [196.00, 246.94, 293.66, 392.00], // G major
      [146.83, 220.00, 293.66, 440.00], // D major
      [196.00, 246.94, 293.66, 392.00], // G major
      [220.00, 277.18, 329.63, 440.00]  // A major
    ];

    let chordIdx = 0;
    let noteIdx = 0;

    function playNote(freq, timeOffset = 0, duration = 1.2) {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();

      osc.type = 'triangle'; // Âm thanh piano/harp êm dịu
      osc.frequency.setValueAtTime(freq, audioContext.currentTime + timeOffset);

      gain.gain.setValueAtTime(0.001, audioContext.currentTime + timeOffset);
      gain.gain.exponentialRampToValueAtTime(0.12, audioContext.currentTime + timeOffset + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + timeOffset + duration);

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.start(audioContext.currentTime + timeOffset);
      osc.stop(audioContext.currentTime + timeOffset + duration);
    }

    if (synthTimer) clearInterval(synthTimer);

    synthTimer = setInterval(() => {
      if (!isPlaying) return;
      const currentChord = chords[chordIdx];
      const freq = currentChord[noteIdx];
      playNote(freq, 0, 1.4);

      noteIdx++;
      if (noteIdx >= currentChord.length) {
        noteIdx = 0;
        chordIdx = (chordIdx + 1) % chords.length;
      }
    }, 420);

  } catch (e) {
    console.warn("Web Audio not supported or blocked", e);
  }
}

/* ==========================================================================
   6. ALBUM ẢNH & LIGHTBOX MODAL
   ========================================================================== */
function initGallery(galleryData) {
  const container = document.getElementById('gallery-container');
  if (!container) return;

  function render(items) {
    container.innerHTML = items.map((item, idx) => `
      <div class="gallery-item" data-index="${idx}" data-category="${item.category}">
        <img src="${item.url}" alt="${item.caption}" loading="lazy" />
        <div class="gallery-overlay">
          <p class="gallery-overlay-text">${item.caption}</p>
        </div>
      </div>
    `).join('');

    // Gắn sự kiện click mở lightbox
    container.querySelectorAll('.gallery-item').forEach(el => {
      el.addEventListener('click', () => {
        const index = parseInt(el.getAttribute('data-index'), 10);
        openLightbox(items, index);
      });
    });
  }

  render(galleryData);

  // Bộ lọc Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      if (filter === 'all') {
        render(galleryData);
      } else {
        const filtered = galleryData.filter(i => i.category === filter);
        render(filtered);
      }
    });
  });
}

function openLightbox(items, currentIndex) {
  const modal = document.getElementById('lightbox-modal');
  const imgEl = document.getElementById('lightbox-img');
  const captionEl = document.getElementById('lightbox-caption');
  if (!modal || !imgEl) return;

  function show(idx) {
    currentIndex = (idx + items.length) % items.length;
    imgEl.src = items[currentIndex].url;
    if (captionEl) captionEl.textContent = items[currentIndex].caption;
  }

  show(currentIndex);
  modal.classList.add('active');

  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  closeBtn.onclick = () => modal.classList.remove('active');
  prevBtn.onclick = (e) => { e.stopPropagation(); show(currentIndex - 1); };
  nextBtn.onclick = (e) => { e.stopPropagation(); show(currentIndex + 1); };

  modal.onclick = (e) => {
    if (e.target === modal) modal.classList.remove('active');
  };
}

/* ==========================================================================
   7. GUESTBOOK (SỔ LƯU BÚT)
   ========================================================================== */
function initGuestbook(defaultWishes) {
  const form = document.getElementById('guestbook-form');
  const stream = document.getElementById('wishes-stream');
  if (!stream) return;

  // Lấy lời chúc đã lưu từ localStorage
  const savedWishes = JSON.parse(localStorage.getItem('wedding_wishes') || '[]');
  const allWishes = [...savedWishes, ...defaultWishes];

  function renderWishes() {
    stream.innerHTML = allWishes.map((w, index) => {
      const initial = w.sender.charAt(0).toUpperCase();
      return `
        <div class="wish-item">
          <div class="wish-header">
            <div class="wish-author">
              <div class="wish-author-avatar">${initial}</div>
              <span>${w.sender}</span>
            </div>
            <span class="wish-time">${w.time || 'Vừa xong'}</span>
          </div>
          <p class="wish-body">${w.message}</p>
          <div class="wish-actions">
            <button class="like-btn" onclick="toggleLikeWish(this, ${index}, ${w.likes || 0})">
              <i class="fa-solid fa-heart"></i> <span>${w.likes || 0}</span>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  renderWishes();

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const senderInput = document.getElementById('wish-sender');
      const messageInput = document.getElementById('wish-message');

      const sender = senderInput.value.trim();
      const message = messageInput.value.trim();

      if (!sender || !message) {
        showToast('Vui lòng nhập tên và lời chúc của bạn nhé!');
        return;
      }

      const newWish = {
        sender,
        message,
        time: 'Vừa xong',
        likes: 1
      };

      allWishes.unshift(newWish);
      savedWishes.unshift(newWish);
      localStorage.setItem('wedding_wishes', JSON.stringify(savedWishes));

      renderWishes();
      form.reset();
      showToast('Cảm ơn bạn đã gửi lời chúc yêu thương! ❤️');
    });
  }
}

window.toggleLikeWish = function(btn, index, currentLikes) {
  const span = btn.querySelector('span');
  if (btn.classList.contains('liked')) {
    btn.classList.remove('liked');
    span.textContent = currentLikes;
  } else {
    btn.classList.add('liked');
    span.textContent = currentLikes + 1;
  }
};

/* ==========================================================================
   8. RSVP FORM (XÁC NHẬN THAM DỰ)
   ========================================================================== */
function initRSVP() {
  const form = document.getElementById('rsvp-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('rsvp-name').value.trim();
    const phone = document.getElementById('rsvp-phone').value.trim();
    const guestSide = form.querySelector('input[name="guest-side"]:checked')?.value || 'Khách chung';
    const attend = form.querySelector('input[name="rsvp-attend"]:checked')?.value || 'Tham dự';
    const count = document.getElementById('rsvp-count').value;
    const note = document.getElementById('rsvp-note').value.trim();

    if (!name) {
      showToast('Vui lòng nhập họ và tên của bạn.');
      return;
    }

    const rsvpData = {
      name,
      phone,
      guestSide,
      attend,
      count,
      note,
      timestamp: new Date().toLocaleString('vi-VN')
    };

    // Lưu trữ vào LocalStorage
    const storedRSVP = JSON.parse(localStorage.getItem('wedding_rsvp_list') || '[]');
    storedRSVP.push(rsvpData);
    localStorage.setItem('wedding_rsvp_list', JSON.stringify(storedRSVP));

    showToast(`Đã nhận phản hồi từ ${name}. Cảm ơn bạn rất nhiều! 💕`);
    form.reset();
  });
}

// XUẤT DANH SÁCH RSVP RA CSV CHO CÔ DÂU CHÚ RỂ
window.exportRSVPToCSV = function() {
  const list = JSON.parse(localStorage.getItem('wedding_rsvp_list') || '[]');
  if (list.length === 0) {
    showToast('Chưa có khách mời nào xác nhận trên thiết bị này.');
    return;
  }

  let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
  csvContent += "Họ và tên,Số điện thoại,Khách phía,Tham dự,Số người,Ghi chú,Thời gian\n";

  list.forEach(item => {
    csvContent += `"${item.name}","${item.phone}","${item.guestSide}","${item.attend}","${item.count}","${item.note}","${item.timestamp}"\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "Danh_sach_khach_RSVP_dam_cuoi.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/* ==========================================================================
   9. SAO CHÉP TÀI KHOẢN NGÂN HÀNG
   ========================================================================== */
function initCopyBank() {
  window.copyToClipboard = function(text, successMsg = 'Đã sao chép thành công!') {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg);
    }).catch(() => {
      // Fallback
      const input = document.createElement('input');
      input.value = text;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      showToast(successMsg);
    });
  };
}

/* ==========================================================================
   10. ADD TO CALENDAR (.ICS / GOOGLE CALENDAR)
   ========================================================================== */
window.addToCalendar = function(title, timeStr, address) {
  // Tạo file iCalendar .ics cho khách tải về lưu trực tiếp vào iPhone/Android/Outlook
  const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding Invitation//Antigravity//VI
BEGIN:VEVENT
SUMMARY:${title} - Minh Quân & Thùy Dung
DESCRIPTION:Hân hạnh kính mời bạn tham dự ${title} của cặp đôi Minh Quân & Thùy Dung.
LOCATION:${address}
DTSTART:20261128T040000Z
DTEND:20261128T080000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'Lich_Cuoi_Quan_Dung.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast('Đã tải lịch sự kiện vào điện thoại của bạn!');
};

/* ==========================================================================
   11. NAVIGATION & SCROLL
   ========================================================================== */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
}

/* ==========================================================================
   12. ENVELOPE WELCOME SCREEN
   ========================================================================== */
function initEnvelopeScreen() {
  const overlay = document.getElementById('envelope-overlay');
  const openBtn = document.getElementById('open-envelope-btn');

  if (openBtn && overlay) {
    openBtn.addEventListener('click', () => {
      overlay.classList.add('opened');
      // Tự động bật nhạc khi khách bấm mở thiệp
      playMusic();
    });
  }
}

/* ==========================================================================
   TOAST HELPER
   ========================================================================== */
function showToast(msg) {
  let toast = document.getElementById('toast-msg');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-msg';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fa-solid fa-heart" style="color: #c06c84;"></i> ${msg}`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
