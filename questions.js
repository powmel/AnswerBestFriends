window.QUESTIONS = {
  filler: [
    {
      question_id: "filler_vibe",
      question: {
        ja: "直感で好きな雰囲気を1つ選んでください。",
        en: "Choose one vibe you intuitively like."
      },
      options: {
        ja: [
          "🌊 Calm / 落ち着いた",
          "🔥 Energetic / エネルギッシュ",
          "🌲 Nature / 自然",
          "🌃 Night city / 夜の街",
          "☕ Cozy / 居心地がいい",
          "🚀 Exciting / ワクワクする",
          "📚 Focused / 集中できる",
          "🎵 Playful / 楽しい"
        ],
        en: [
          "🌊 Calm",
          "🔥 Energetic",
          "🌲 Nature",
          "🌃 Night city",
          "☕ Cozy",
          "🚀 Exciting",
          "📚 Focused",
          "🎵 Playful"
        ]
      }
    },
    {
      question_id: "filler_mood",
      question: {
        ja: "今の気分に近いものを1つ選んでください。",
        en: "Choose one option closest to your current mood."
      },
      options: {
        ja: [
          "🌊 Calm / 落ち着いた",
          "🔥 Energetic / エネルギッシュ",
          "🌲 Nature / 自然",
          "🌃 Night city / 夜の街",
          "☕ Cozy / 居心地がいい",
          "🚀 Exciting / ワクワクする",
          "📚 Focused / 集中できる",
          "🎵 Playful / 楽しい"
        ],
        en: [
          "🌊 Calm",
          "🔥 Energetic",
          "🌲 Nature",
          "🌃 Night city",
          "☕ Cozy",
          "🚀 Exciting",
          "📚 Focused",
          "🎵 Playful"
        ]
      }
    }
  ],

  // Four common main questions are repeated in every 2/4/8-choice block.
  main: [
    {
      question_id: "food",
      question: {
        ja: "今日食べたいものを1つ選んでください。",
        en: "What do you want to eat today?"
      },
      options: {
        ja: ["ピザ", "寿司", "ラーメン", "カレー", "パスタ", "そば", "ピラフ", "焼き鳥"],
        en: ["Pizza", "Sushi", "Ramen", "Curry", "Pasta", "Soba", "Pilaf", "Yakitori"]
      }
    },
    {
      question_id: "weekend_place",
      question: {
        ja: "週末に行くなら、どこがいいですか？",
        en: "Where would you like to go this weekend?"
      },
      options: {
        ja: ["カフェ", "映画館", "ショッピングモール", "公園", "家でゆっくり", "本屋", "ジム", "観光地を散歩"],
        en: ["Cafe", "Movie theater", "Shopping mall", "Park", "Relaxing at home", "Bookstore", "Gym", "Sightseeing walk"]
      }
    },
    {
      question_id: "study_place",
      question: {
        ja: "集中して勉強や作業をするなら、どの場所を選びますか？",
        en: "If you want to focus on studying or working, which place would you choose?"
      },
      options: {
        ja: ["家の机", "図書館", "カフェ", "コワーキングスペース", "研究室", "公園のベンチ", "電車の中", "友達の家"],
        en: ["Desk at home", "Library", "Cafe", "Coworking space", "Laboratory", "Park bench", "On the train", "Friend's place"]
      }
    },
    {
      question_id: "movie_genre",
      question: {
        ja: "好きな映画のジャンルを1つ選んでください。",
        en: "What kind of movies do you like?"
      },
      options: {
        ja: ["コメディ", "ホラー", "アクション", "恋愛", "SF", "アニメ", "ドキュメンタリー", "ミステリー"],
        en: ["Comedy", "Horror", "Action", "Romance", "Sci-fi", "Anime", "Documentary", "Mystery"]
      }
    }
  ],

  // One extra main question differs by block size while keeping the same data schema and row counts.
  specialMain: {
    2: {
      question_id: "beverage_choice",
      question: {
        ja: "実際に飲みたくなくても、直感でどちらの方が飲みたいか選んでください。",
        en: "Even if you do not actually want a drink right now, choose which one you would prefer intuitively."
      },
      options: {
        ja: ["コーヒー", "お茶"],
        en: ["Coffee", "Tea"]
      }
    },
    4: {
      question_id: "ai_tool",
      question: {
        ja: "今使うなら、どのAIツールを選びますか？",
        en: "Which AI tool would you choose to use now?"
      },
      options: {
        ja: ["ChatGPT", "Gemini", "Claude", "xAI"],
        en: ["ChatGPT", "Gemini", "Claude", "xAI"]
      }
    },
    8: {
      question_id: "favorite_color",
      question: {
        ja: "好きな色を1つ選んでください。",
        en: "Choose one color you like."
      },
      options: {
        ja: ["赤", "青", "緑", "黄色", "紫", "ピンク", "黒", "白"],
        en: ["Red", "Blue", "Green", "Yellow", "Purple", "Pink", "Black", "White"]
      }
    }
  },

  bonus: {
    members: {
      ja: ["Taiki", "Adrian Nadikita", "Julyet", "Neo", "shasenem", "ヒューゴ・Hugo", "Vanessa", "~Daichi DA"],
      en: ["Taiki", "Adrian Nadikita", "Julyet", "Neo", "shasenem", "ヒューゴ・Hugo", "Vanessa", "~Daichi DA"]
    },
    questions: [
      { question_id: "bonus_night_walk", text: { ja: "二人で夜出かけるなら誰がいい？", en: "Who would you choose for a nighttime walk together?" } },
      { question_id: "bonus_reliable", text: { ja: "この中で一番頼りになる人は？", en: "Who seems the most dependable?" } },
      { question_id: "bonus_cooking", text: { ja: "この中で一番料理を食べてみたい人は？", en: "Whose cooking would you most want to try?" } },
      { question_id: "bonus_reachable", text: { ja: "この中で一番早く連絡がつかまりそうな人は？", en: "Who seems easiest to reach quickly?" } },
      { question_id: "bonus_marriage", text: { ja: "この中で一番早く結婚しそうな人は？", en: "Who seems most likely to get married first?" } }
    ]
  }
};
