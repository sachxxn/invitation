export interface EventItem {
  id: string;
  title: string;
  tamilTitle: string;
  tagline: string;
  date: string;
  tamilDate: string;
  time: string;
  venue: string;
  tamilVenue: string;
  address: string;
  image: string;
  description: string;
  iconName: string;
  calendarStartDate: string; // ISO 8601 or YYYYMMDDTHHmmssZ
  calendarEndDate: string;
}

export interface GalleryItem {
  id: number;
  url: string;
  title: string;
  subtitle: string;
  aspect: 'portrait' | 'landscape' | 'square';
}

export interface FamilyMember {
  relation: string;
  tamilRelation: string;
  names: string[];
  location?: string;
}

export interface WeddingConfig {
  brideName: string;
  brideTamilName: string;
  brideQualification: string;
  brideCompany: string;
  brideParents: string;
  brideTamilParents: string;
  
  groomName: string;
  groomTamilName: string;
  groomQualification: string;
  groomCompany: string;
  groomParents: string;
  groomTamilParents: string;

  weddingTitle: string;
  weddingDateDisplay: string;
  weddingDateTamil: string;
  weddingIsoDate: string; // For countdown
  muhurthamTime: string;
  muhurthamLagnam: string;
  
  venueName: string;
  venueTamilName: string;
  venueAddress: string;
  venueTamilAddress: string;
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
  
  sacredQuoteTamil: string;
  sacredQuoteMeaning: string;
  
  storyParagraphs: string[];
  
  events: EventItem[];
  gallery: GalleryItem[];
  
  brideLineage: {
    greatGrandParents?: string;
    grandParents: string;
    parents: string;
    parentsEnglish?: string;
    location: string;
  };
  
  groomLineage: {
    greatGrandParents?: string;
    grandParents: string;
    parents: string;
    parentsEnglish?: string;
    location: string;
  };
  
  bestCompliments: {
    elders?: string[];
    family?: string[];
    youth: string[];
    closing: string;
    subClosing?: string;
  };
  
  contactPhones: string[];
  musicUrl?: string;
  musicTitle?: string;
}

