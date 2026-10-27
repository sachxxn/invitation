import type { WeddingConfig } from '../types/wedding';


export const weddingData: WeddingConfig = {
  brideName: "N. Kaaviya",
  brideTamilName: "செல்வி. N. காவியா",
  brideQualification: "B.Com., CMA.",
  brideCompany: "L&T Construction — Chennai",
  brideParents: "Mr. A. Natarajan & Mrs. N. Sudha",
  brideTamilParents: "திரு. A. நடராஜன் & திருமதி. N. சுதா",

  groomName: "R.V. Thyaneshwar",
  groomTamilName: "செல்வன். R.V. தியானேஷ்வர்",
  groomQualification: "M.E.",
  groomCompany: "Project Manager — Bizzoppo Interiors Pvt Ltd",
  groomParents: "Mr. T.R. Venkatesh & Mrs. D.R. Umashankari",
  groomTamilParents: "திரு. T.R. வெங்கடேஷ் & திருமதி. D.R. உமாசங்கரி",

  weddingTitle: "The Royal Wedding Celebration",
  weddingDateDisplay: "Saturday, 14th November 2026 • Sunday, 15th November 2026",
  weddingDateTamil: "2026 நவம்பர் 14 (சனி) & நவம்பர் 15 (ஞாயிறு)",
  weddingIsoDate: "2026-11-15T07:30:00+05:30",
  muhurthamTime: "7:30 AM – 9:00 AM",
  muhurthamLagnam: "விருச்சிக லக்னம், சுபயோக சுபதினத்தில் (Vrischika Lagnam)",

  venueName: "Shri Venkateswara Mahal",
  venueTamilName: "ஸ்ரீ வெங்கடேஸ்வரா மஹால்",
  venueAddress: "Kanchipuram Bypass Road, Chengalpattu, Tamil Nadu 603001",
  venueTamilAddress: "காஞ்சிபுரம் பைபாஸ் சாலை, செங்கல்பட்டு",
  googleMapsUrl: "https://maps.google.com/?q=Shri+Venkateswara+Mahal+Chengalpattu",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3893.41168393856!2d79.9723576!3d12.6934895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52fdfbc307ebf7%3A0x2863920fbdd1639c!2sShri%20Venkateswara%20Mahal!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",

  sacredQuoteTamil: "அன்பும் அறனும் உடைத்தாயின் இல்வாழ்க்கை\nபண்பும் பயனும் அது.",
  sacredQuoteMeaning: "If domestic life possesses love and virtue, that is both its grace and its true fulfillment. — Thirukkural",

  storyParagraphs: [
    "From two distinct paths of ambition and creativity — finance with engineering, strategy with architecture — their destinies aligned with the gentle blessings of destiny and beloved elders.",
    "Kaaviya's poise and elegance beautifully complemented Thyaneshwar's thoughtful warmth and vision. What began as an auspicious alliance blossomed into deep mutual respect, shared laughter, and a profound promise of forever.",
    "Surrounded by the sacred chants of Vedic mantras, the fragrant aroma of jasmine and marigolds, and the unconditional love of our parents and families, we step forward hand in hand into a lifetime of togetherness."
  ],

  events: [
    {
      id: "pandhakal",
      title: "Pandhakal Muhurtham",
      tamilTitle: "பந்தகால் முகூர்த்தம்",
      tagline: "Sacred Inception & Auspicious Blessings",
      date: "Friday, 13th November 2026",
      tamilDate: "13.11.2026 வெள்ளிக்கிழமை",
      time: "6:00 AM – 7:30 AM",
      venue: "Bride's Residence & Traditional Hall",
      tamilVenue: "இல்லம்",
      address: "N.S.K. Street, Chengalpattu",
      image: "/images/wedding.jpg",
      description: "Erecting the sacred bamboo pillar adorned with mango leaves and turmeric, invoking divine blessings of the deities and ancestors for a smooth, joyous wedding.",
      iconName: "Flame",
      calendarStartDate: "20261113T003000Z",
      calendarEndDate: "20261113T020000Z",
    },
    {
      id: "nichayathartham",
      title: "Nichayathartham (Engagement)",
      tamilTitle: "நிச்சயார்த்தம்",
      tagline: "The Sacred Promise & Exchange of Lagna Patrikai",
      date: "Saturday, 14th November 2026",
      tamilDate: "14.11.2026 சனிக்கிழமை",
      time: "4:00 PM – 5:00 PM",
      venue: "Shri Venkateswara Mahal",
      tamilVenue: "ஸ்ரீ வெங்கடேஸ்வரா மஹால்",
      address: "Kanchipuram Bypass Road, Chengalpattu",
      image: "/images/engagement.jpg",
      description: "Formal announcement and reading of the sacred marriage agreement (Lagna Patrikai) in the presence of esteemed elders, followed by traditional ring and gift exchanges.",
      iconName: "HeartHandshake",
      calendarStartDate: "20261114T103000Z",
      calendarEndDate: "20261114T113000Z",
    },
    {
      id: "reception",
      title: "Wedding Reception",
      tamilTitle: "திருமண வரவேற்பு",
      tagline: "An Evening of Celebration, Music & Feasting",
      date: "Saturday, 14th November 2026",
      tamilDate: "14.11.2026 சனிக்கிழமை",
      time: "6:30 PM onwards",
      venue: "Shri Venkateswara Mahal",
      tamilVenue: "ஸ்ரீ வெங்கடேஸ்வரா மஹால்",
      address: "Kanchipuram Bypass Road, Chengalpattu",
      image: "/images/reception.jpg",
      description: "Join us under royal chandeliers for an enchanting evening filled with congratulations, joyous music, photo moments, and an authentic royal South Indian grand banquet feast.",
      iconName: "Sparkles",
      calendarStartDate: "20261114T130000Z",
      calendarEndDate: "20261114T170000Z",
    },
    {
      id: "muhurtham",
      title: "Subha Muhurtham (The Royal Wedding)",
      tamilTitle: "சுபமுகூர்த்தம்",
      tagline: "The Divine Knot & Seven Sacred Steps",
      date: "Sunday, 15th November 2026",
      tamilDate: "15.11.2026 ஞாயிற்றுக்கிழமை",
      time: "7:30 AM – 9:00 AM",
      venue: "Shri Venkateswara Mahal",
      tamilVenue: "ஸ்ரீ வெங்கடேஸ்வரா மஹால்",
      address: "Kanchipuram Bypass Road, Chengalpattu",
      image: "/images/thaali.jpg",
      description: "The sacred and auspicious Muhurtham in Vrischika Lagnam, featuring Maalai Maatral (garland exchange), Mangalyadharanam (tying of the Thaali), Saptapadi (seven sacred vows around the holy fire), and showering of holy yellow akshadha.",
      iconName: "Crown",
      calendarStartDate: "20261115T020000Z",
      calendarEndDate: "20261115T033000Z",
    }
  ],

  gallery: [
    {
      id: 1,
      url: "/images/hero.jpg",
      title: "Royal Grandeur",
      subtitle: "Twilight palace courtyard illuminated with traditional diyas and chandeliers",
      aspect: "landscape"
    },
    {
      id: 2,
      url: "/images/couple.jpg",
      title: "Kaaviya & Thyaneshwar",
      subtitle: "A union of timeless heritage and modern grace in auspicious Kanchipuram silk",
      aspect: "portrait"
    },
    {
      id: 3,
      url: "/images/wedding.jpg",
      title: "Sacred Mandap",
      subtitle: "Adorned with cascading jasmine, marigolds, and the eternal Vedic fire",
      aspect: "landscape"
    },
    {
      id: 4,
      url: "/images/thaali.jpg",
      title: "Mangalyadharanam",
      subtitle: "The divine knot tied amidst sacred mantras and joyous showers of holy petals",
      aspect: "landscape"
    },
    {
      id: 5,
      url: "/images/engagement.jpg",
      title: "Sacred Vows",
      subtitle: "Hands united in trust, love, and eternal companionship",
      aspect: "square"
    },
    {
      id: 6,
      url: "/images/reception.jpg",
      title: "Grand Evening",
      subtitle: "A regal floral banquet celebration filled with warmth and laughter",
      aspect: "landscape"
    },
    {
      id: 7,
      url: "/images/venue.jpg",
      title: "Shri Venkateswara Mahal",
      subtitle: "The grand venue welcoming families and guests at Chengalpattu",
      aspect: "landscape"
    }
  ],

  brideLineage: {
    greatGrandParents: "தெய்வத்திருவாளர்கள் பரமானந்த முதலியார் — பாக்கியம்மாள்",
    grandParents: "திரு. P.A. அழகேச முதலியார் — தெய்வத்திருமதி. A. பொன்னம்மாள் (ஒரக்காட்டுப்பேட்டை)",
    parents: "திரு. A. நடராஜன் & திருமதி. N. சுதா",
    parentsEnglish: "Mr. A. Natarajan & Mrs. N. Sudha",
    location: "N.S.K. தெரு, செங்கல்பட்டு"
  },

  groomLineage: {
    greatGrandParents: "தெய்வத்திருவாளர்கள் Ve.Ra. ராஜமாணிக்கம் முதலியார் — கண்ணம்மாள்",
    grandParents: "D.V. ராமலிங்கம் முதலியார் — தெய்வத்திருமதி. ராணியம்மாள் (அச்சரப்பாக்கம்)",
    parents: "திரு. T.R. வெங்கடேஷ் & திருமதி. D.R. உமாசங்கரி",
    parentsEnglish: "Mr. T.R. Venkatesh & Mrs. D.R. Umashankari",
    location: "தேசுமுகிப்பேட்டை, திருக்கழுக்குன்றம்"
  },

  bestCompliments: {
    youth: [
      "N. சந்தோஷ்",
      "M. அட்சயா",
      "M. சஞ்சய்"
    ],
    closing: "With Best Wishes from Friends & Relatives",
    subClosing: "With Love & Regards from All Relatives & Friends"
  },

  contactPhones: ["9994256200", "9600864700"],
  musicUrl: "/audio/anbil_avan.mp3",
  musicTitle: "Anbil Avan (அன்பில் அவன்) — A.R. Rahman"
};

