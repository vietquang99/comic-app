// Dữ liệu mẫu cho truyện
export const mockComics = {
  featured: [
    {
      id: 1,
      title: "One Piece",
      cover: "/comics/1.jpg",
      chapter: "Chapter 1089: The Final Battle",
    },
    {
      id: 2,
      title: "Jujutsu Kaisen",
      cover: "/comics/1.jpg",
      chapter: "Chapter 236: The End",
    },
    {
      id: 3,
      title: "Demon Slayer",
      cover: "/comics/1.jpg",
      chapter: "Chapter 205: Final Form",
    },
    {
      id: 4,
      title: "Attack on Titan",
      cover: "/comics/1.jpg",
      chapter: "Chapter 139: The End",
    },
    {
      id: 5,
      title: "My Hero Academia",
      cover: "/comics/1.jpg",
      chapter: "Chapter 402: The Final Battle",
    },
    {
      id: 6,
      title: "Black Clover",
      cover: "/comics/1.jpg",
      chapter: "Chapter 368: The Final Battle",
    },
    {
      id: 7,
      title: "Dr. Stone",
      cover: "/comics/1.jpg",
      chapter: "Chapter 232: The Final Battle",
    },
    {
      id: 8,
      title: "The Promised Neverland",
      cover: "/comics/1.jpg",
      chapter: "Chapter 181: The End",
    },
  ],
  updated: [
    {
      id: 9,
      title: "Solo Leveling",
      cover: "/comics/1.jpg",
      chapter: "Chapter 179: The Final Battle",
    },
    {
      id: 10,
      title: "Tower of God",
      cover: "/comics/1.jpg",
      chapter: "Chapter 567: The Final Battle",
    },
    {
      id: 11,
      title: "God of High School",
      cover: "/comics/1.jpg",
      chapter: "Chapter 567: The Final Battle",
    },
    {
      id: 12,
      title: "The Beginning After The End",
      cover: "/comics/1.jpg",
      chapter: "Chapter 179: The Final Battle",
    },
    {
      id: 13,
      title: "Omniscient Reader",
      cover: "/comics/1.jpg",
      chapter: "Chapter 179: The Final Battle",
    },
    {
      id: 14,
      title: "The Legendary Moonlight Sculptor",
      cover: "/comics/1.jpg",
      chapter: "Chapter 179: The Final Battle",
    },
    {
      id: 15,
      title: "Overgeared",
      cover: "/comics/1.jpg",
      chapter: "Chapter 179: The Final Battle",
    },
    {
      id: 16,
      title: "The Second Coming of Gluttony",
      cover: "/comics/1.jpg",
      chapter: "Chapter 179: The Final Battle",
    },
    {
      id: 17,
      title: "The Great Mage Returns After 4000 Years",
      cover: "/comics/1.jpg",
      chapter: "Chapter 179: The Final Battle",
    },
    {
      id: 18,
      title: "The Descent of the Demonic Master",
      cover: "/comics/1.jpg",
      chapter: "Chapter 179: The Final Battle",
    },
    {
      id: 19,
      title: "The Max Level Hero Has Returned!",
      cover: "/comics/1.jpg",
      chapter: "Chapter 179: The Final Battle",
    },
    {
      id: 20,
      title: "The Tutorial Is Too Hard",
      cover: "/comics/1.jpg",
      chapter: "Chapter 179: The Final Battle",
    },
  ],

  // Thêm dữ liệu chi tiết truyện
  details: {
    1: {
      id: 1,
      title: "One Piece",
      cover: "/comics/1.jpg",
      alternativeTitles: ["Vua Hải Tặc", "海贼王", "원피스"],
      author: "Eiichiro Oda",
      artist: "Eiichiro Oda",
      status: "Đang tiến hành",
      releaseYear: 1997,
      genres: [
        "Hành động",
        "Phiêu lưu",
        "Hài hước",
        "Drama",
        "Fantasy",
        "Shounen",
      ],
      rating: 4.9,
      views: 15000000,
      followers: 320000,
      summary:
        "One Piece là câu chuyện về Monkey D. Luffy, một cậu bé có ước mơ trở thành Vua Hải Tặc và tìm kiếm kho báu huyền thoại One Piece. Sau khi vô tình ăn phải trái ác quỷ Gomu Gomu, Luffy trở thành người cao su và có khả năng co giãn không giới hạn. Cùng với thủy thủ đoàn của mình, Luffy đã bắt đầu cuộc hành trình khám phá vùng biển nguy hiểm Grand Line để tìm kiếm kho báu và đối mặt với nhiều kẻ thù nguy hiểm.",
      chapters: [
        {
          id: 1,
          number: 1089,
          title: "The Final Battle",
          releaseDate: "2023-04-15",
          views: 45000,
        },
        {
          id: 2,
          number: 1088,
          title: "Luffy vs Kaido",
          releaseDate: "2023-04-08",
          views: 42000,
        },
        {
          id: 3,
          number: 1087,
          title: "The Power of Friendship",
          releaseDate: "2023-04-01",
          views: 41500,
        },
        {
          id: 4,
          number: 1086,
          title: "Showdown",
          releaseDate: "2023-03-25",
          views: 43000,
        },
        {
          id: 5,
          number: 1085,
          title: "New Alliance",
          releaseDate: "2023-03-18",
          views: 40000,
        },
        {
          id: 6,
          number: 1084,
          title: "Secret Revealed",
          releaseDate: "2023-03-11",
          views: 39000,
        },
        {
          id: 7,
          number: 1083,
          title: "The Truth of One Piece",
          releaseDate: "2023-03-04",
          views: 38500,
        },
        {
          id: 8,
          number: 1082,
          title: "Awakening",
          releaseDate: "2023-02-25",
          views: 37000,
        },
        {
          id: 9,
          number: 1081,
          title: "The New Era",
          releaseDate: "2023-02-18",
          views: 36000,
        },
        {
          id: 10,
          number: 1080,
          title: "The Will of D",
          releaseDate: "2023-02-11",
          views: 35500,
        },
      ],
      comments: [
        {
          id: 1,
          user: "OnePieceFan123",
          content: "Tập này quá hay, không thể đợi tập tiếp theo!",
          rating: 5,
          date: "2023-04-15",
        },
        {
          id: 2,
          user: "MangaLover",
          content: "Oda vẫn giữ được phong độ sau nhiều năm",
          rating: 5,
          date: "2023-04-14",
        },
        {
          id: 3,
          user: "AnimeFanatic",
          content: "Cốt truyện ngày càng hấp dẫn",
          rating: 4,
          date: "2023-04-13",
        },
      ],
    },
    2: {
      id: 2,
      title: "Jujutsu Kaisen",
      cover: "/comics/1.jpg",
      alternativeTitles: ["Chú Thuật Hồi Chiến", "呪術廻戦", "주술회전"],
      author: "Gege Akutami",
      artist: "Gege Akutami",
      status: "Đang tiến hành",
      releaseYear: 2018,
      genres: ["Hành động", "Siêu nhiên", "Horror", "Học đường", "Shounen"],
      rating: 4.8,
      views: 10000000,
      followers: 280000,
      summary:
        "Yuji Itadori là một học sinh trung học với khả năng thể chất phi thường. Hàng ngày, cậu dành thời gian tới bệnh viện chăm sóc ông mình. Một ngày nọ, trường học của Yuji xảy ra hiện tượng siêu nhiên khi những lời nguyền tấn công. Để bảo vệ bạn bè, Yuji đã nuốt một trong 20 ngón tay của Sukuna, một lời nguyền cổ đại, và trở thành vật chứa của Sukuna. Từ đó, cậu gia nhập Trường Chuyên Chú Thuật để học cách kiểm soát năng lực và tìm kiếm các ngón tay còn lại của Sukuna.",
      chapters: [
        {
          id: 1,
          number: 236,
          title: "The End",
          releaseDate: "2023-04-15",
          views: 38000,
        },
        {
          id: 2,
          number: 235,
          title: "Gojo vs Sukuna",
          releaseDate: "2023-04-08",
          views: 37000,
        },
        {
          id: 3,
          number: 234,
          title: "The Final Curse",
          releaseDate: "2023-04-01",
          views: 36500,
        },
        {
          id: 4,
          number: 233,
          title: "Reunion",
          releaseDate: "2023-03-25",
          views: 35000,
        },
        {
          id: 5,
          number: 232,
          title: "Yuta's Power",
          releaseDate: "2023-03-18",
          views: 34000,
        },
        {
          id: 6,
          number: 231,
          title: "Secret Technique",
          releaseDate: "2023-03-11",
          views: 33000,
        },
        {
          id: 7,
          number: 230,
          title: "The Truth",
          releaseDate: "2023-03-04",
          views: 32500,
        },
        {
          id: 8,
          number: 229,
          title: "Domain Expansion",
          releaseDate: "2023-02-25",
          views: 31000,
        },
        {
          id: 9,
          number: 228,
          title: "The New Era",
          releaseDate: "2023-02-18",
          views: 30000,
        },
        {
          id: 10,
          number: 227,
          title: "Yuji's Decision",
          releaseDate: "2023-02-11",
          views: 29500,
        },
      ],
      comments: [
        {
          id: 1,
          user: "JujutsuFan",
          content: "Trận chiến cuối cùng quá hoành tráng!",
          rating: 5,
          date: "2023-04-15",
        },
        {
          id: 2,
          user: "MangaEnthusiast",
          content: "Cách vẽ và kể chuyện của tác giả quá xuất sắc",
          rating: 5,
          date: "2023-04-14",
        },
        {
          id: 3,
          user: "CursedTechFan",
          content: "Hệ thống chú lực rất sáng tạo và hấp dẫn",
          rating: 4,
          date: "2023-04-13",
        },
      ],
    },
  },
};
