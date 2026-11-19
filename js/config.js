/**
 * CẤU HÌNH THÔNG TIN THIỆP CƯỚI & BLOG
 * Bạn chỉ cần chỉnh sửa các thông tin trong file này để thay đổi toàn bộ nội dung website!
 */

const WEDDING_CONFIG = {
  // 1. THÔNG TIN CẶP ĐÔI
  groom: {
    fullName: "Nguyễn Minh Quân",
    shortName: "Minh Quân",
    nickname: "Quân",
    role: "Chú Rể",
    bio: "Một kỹ sư công nghệ đam mê nhiếp ảnh và du lịch. Người luôn tin rằng điều tuyệt vời nhất trong cuộc đời là tìm thấy người cùng mình sẻ chia mọi khoảnh khắc giản dị.",
    father: "Nguyễn Văn Hùng",
    mother: "Trần Thị Mai",
    familySide: "Nhà Trai",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    coverPhoto: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    bank: {
      bankName: "Ngân hàng TMCP Ngoại thương (Vietcombank)",
      accountNumber: "0071001234567",
      accountName: "NGUYEN MINH QUAN",
      qrUrl: "https://api.vietqr.io/image/970436-0071001234567-compact2.jpg?accountName=NGUYEN%20MINH%20QUAN&amount=0"
    }
  },

  bride: {
    fullName: "Lê Thị Thùy Dung",
    shortName: "Thùy Dung",
    nickname: "Dung",
    role: "Cô Dâu",
    bio: "Một cô gái thiết kế đồ họa yêu thiên nhiên, thích làm bánh và chăm sóc cây cối. Người tìm thấy sự bình yên và ấm áp trong từng nụ cười ấm áp của anh.",
    father: "Lê Hoàng Long",
    mother: "Phạm Thúy Hằng",
    familySide: "Nhà Gái",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    coverPhoto: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    bank: {
      bankName: "Ngân hàng Quân Đội (MB Bank)",
      accountNumber: "0987654321999",
      accountName: "LE THI THUY DUNG",
      qrUrl: "https://api.vietqr.io/image/970422-0987654321999-compact2.jpg?accountName=LE%20THI%20THUY%20DUNG&amount=0"
    }
  },

  // 2. THỜI GIAN & ĐỊA ĐIỂM CHUNG
  wedding: {
    title: "Save Our Date",
    invitationSubtitle: "HÂN HẠNH KÍNH MỜI QUÝ KHÁCH ĐẾN DỰ LỄ THÀNH HÔN CỦA",
    quote: "“Tình yêu không phải là nhìn nhau, mà là cùng nhau nhìn về một hướng.”",
    authorQuote: "— Antoine de Saint-Exupéry —",
    // Ngày giờ lễ cưới chính (Format: YYYY-MM-DDTHH:mm:ss)
    dateTime: "2026-11-28T11:00:00",
    solarDateString: "Thứ Bảy, ngày 28 tháng 11 năm 2026",
    lunarDateString: "Tức ngày 20 tháng 10 năm Bính Ngọ (Âm lịch)",
    heroBackground: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1920&q=85",
    themeColor: "#C06C84"
  },

  // 3. CÁC SỰ KIỆN CHI TIẾT
  events: [
    {
      id: "vu-quy",
      title: "LỄ VU QUY (NHÀ GÁI)",
      time: "08:30 - Thứ Bảy, 28/11/2026",
      locationName: "Tư gia Nhà Gái",
      address: "Số 128 Nguyễn Trãi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh",
      mapUrl: "https://maps.google.com/?q=Ben+Thanh+District+1+Ho+Chi+Minh",
      icon: "fa-home-heart",
      description: "Nghi lễ rước dâu và kính báo gia tiên tại tư gia cô dâu."
    },
    {
      id: "thanh-hon",
      title: "LỄ THÀNH HÔN (NHÀ TRAI)",
      time: "10:00 - Thứ Bảy, 28/11/2026",
      locationName: "Tư gia Nhà Trai",
      address: "Số 56 Nam Kỳ Khởi Nghĩa, Phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh",
      mapUrl: "https://maps.google.com/?q=Vo+Thi+Sau+District+3+Ho+Chi+Minh",
      icon: "fa-ring",
      description: "Nghi thức đón nàng dâu mới về nhà chồng và lễ bái gia tiên họ nhà trai."
    },
    {
      id: "tiec-cuoi",
      title: "TIỆC CƯỚI CHÍNH THỨC",
      time: "11:30 - Thứ Bảy, 28/11/2026",
      locationName: "Trung Tâm Hội Nghị Tiệc Cưới The Crystal Palace",
      address: "Sảnh Diamond Grand, Tầng 3, 256 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
      mapUrl: "https://maps.google.com/?q=Nguyen+Hue+District+1+Ho+Chi+Minh",
      icon: "fa-champagne-glasses",
      description: "Tiệc mừng cùng người thân, bạn bè thân hữu và chia sẻ niềm vui hạnh phúc viên mãn."
    }
  ],

  // 4. DRESS CODE KHUYẾN KHÍCH
  dressCode: {
    note: "Để những bức ảnh kỷ niệm thêm phần hài hòa và trang trọng, quý khách có thể ưu tiên các tông màu dưới đây:",
    colors: [
      { name: "Trắng Kem", hex: "#FAF8F5", border: "#D8D2C2" },
      { name: "Beige Nhẹ", hex: "#EADBC8", border: "#C8B6A6" },
      { name: "Hồng Pastel", hex: "#F3D5D8", border: "#DFB2B7" },
      { name: "Xanh Mint", hex: "#D0E8DF", border: "#A9C5BA" },
      { name: "Vàng Champagne", hex: "#F5E6CA", border: "#D6BF96" }
    ]
  },

  // 5. CHUYỆN TÌNH YÊU (LOVE STORY / BLOG KỶ NIỆM)
  loveStory: [
    {
      year: "Mùa Thu 2021",
      title: "Lần Đầu Chạm Mắt Tại Quán Trà Nhỏ",
      description: "Một chiều mưa bất chợt ở góc phố Sài Gòn, anh vô tình nhường chiếc dù cuối cùng cho một cô gái đang lúng túng bên hiên quán. Một nụ cười cảm ơn ngượng ngùng đã bắt đầu cho một hành trình diệu kỳ.",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
      tag: "Khoảnh khắc định mệnh"
    },
    {
      year: "Mùa Xuân 2022",
      title: "Buổi Hẹn Hò Đầu Tiên",
      description: "Buổi hẹn đầu tiên ở đồi hoa Đà Lạt. Dưới không khí se lạnh, chiếc áo khoác anh trao và đôi tay lần đầu chạm khẽ. Cả hai đều biết rằng mình đã tìm thấy một nửa bình yên.",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
      tag: "Lời tỏ tình ấm áp"
    },
    {
      year: "Mùa Hè 2024",
      title: "Chuyến Đi Vượt Qua Thử Thách",
      description: "Những chuyến đi xa cùng nhau, cùng chia sẻ những khó khăn trong công việc lẫn cuộc sống. Từng mảnh ghép dần hoàn hảo khi có người kia luôn kiên nhẫn thấu hiểu và sẻ chia.",
      image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80",
      tag: "Trưởng thành cùng nhau"
    },
    {
      year: "Đêm Giáng Sinh 2025",
      title: "Lời Cầu Hôn Dưới Bầu Trời Đầy Sao",
      description: "“Anh không hứa cuộc đời sẽ luôn màu hồng, nhưng anh hứa sẽ luôn nắm chặt tay em trong mọi giông bão.” Giọt nước mắt hạnh phúc và câu trả lời 'Em đồng ý!' khép lại những năm tháng thanh xuân ngọt ngào.",
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80",
      tag: "She said YES!"
    },
    {
      year: "Tháng 11, 2026",
      title: "Ngày Chung Đôi - Khởi Đầu Tổ Ấm",
      description: "Hôm nay, trước sự chứng kiến và chúc phúc của hai bên gia đình cùng những người thương quý nhất, chúng mình chính thức trở thành người một nhà.",
      image: "https://images.unsplash.com/photo-1519225429980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
      tag: "Mãi mãi bên nhau"
    }
  ],

  // 6. ALBUM ẢNH CƯỚI (GALLERY)
  gallery: [
    {
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
      caption: "Hạnh phúc trọn vẹn trong từng ánh mắt",
      category: "pre-wedding"
    },
    {
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
      caption: "Cùng anh đi qua muôn nẻo đường",
      category: "pre-wedding"
    },
    {
      url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80",
      caption: "Dưới bóng cây xanh và ánh nắng ban mai",
      category: "ceremony"
    },
    {
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
      caption: "Khoảnh khắc sánh bước bên nhau",
      category: "pre-wedding"
    },
    {
      url: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=80",
      caption: "Nụ cười rạng rỡ của ngày trọng đại",
      category: "moments"
    },
    {
      url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
      caption: "Trao nhau chiếc nhẫn đính ước trọn đời",
      category: "ceremony"
    },
    {
      url: "https://images.unsplash.com/photo-1519225429980-715cb0215aed?auto=format&fit=crop&w=1200&q=80",
      caption: "Vũ điệu tình yêu say đắm",
      category: "moments"
    },
    {
      url: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=80",
      caption: "Lời nguyện thề chân thành",
      category: "ceremony"
    }
  ],

  // 7. SỔ LƯU BÚT MẪU (LỜI CHÚC TỪ BẠN BÈ)
  sampleWishes: [
    {
      sender: "Gia đình Bác Hùng (Hà Nội)",
      message: "Chúc hai cháu trăm năm tình viên mãn, bạc đầu nghĩa phu thê! Chúc tổ ấm mới ngập tràn tiếng cười và niềm hạnh phúc bất tận.",
      time: "2 giờ trước",
      likes: 12
    },
    {
      sender: "Nhóm Bạn Thân Đại Học K58",
      message: "Cuối cùng thì chàng trai chung tình nhất phòng cũng rước được nàng về dinh! Chúc đôi bạn trẻ sớm có thêm những thiên thần nhỏ đáng yêu nha!",
      time: "5 giờ trước",
      likes: 28
    },
    {
      sender: "Chị Mai & Anh Tuấn (Đồng nghiệp)",
      message: "Ngưỡng mộ tình yêu 5 năm đẹp như mơ của Quân và Dung. Chúc em gái của chị mãi rạng rỡ, xinh đẹp và được anh chồng yêu chiều hết mực!",
      time: "Hôm qua",
      likes: 19
    }
  ],

  // 8. CẤU HÌNH NHẠC CƯỚI
  audio: {
    title: "Canon in D / Wedding Piano Romance",
    // Nếu có file mp3 thì điền link ở đây, nếu rỗng hệ thống sẽ kích hoạt bộ tổng hợp giai điệu Piano lofi du dương bằng Web Audio API
    src: ""
  }
};

// Xuất ra window để các file script khác dễ dàng truy cập
window.WEDDING_CONFIG = WEDDING_CONFIG;
