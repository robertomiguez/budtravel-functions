export interface Ticket {
  id: number;
  createdAt: Date;
  quoteId: number;
  quoteDateTime: Date;
  quoteUrl: string;
  price: number;
  multiCarrier: boolean;
  journeys: Journey[];
}

export interface Journey {
  carrierName: string;
  carrierLogo: string;
  return: boolean;
  outbound: Leg;
  inbound: Leg;
}

interface Leg {
  date: Date;
  iataCode: string;
  placeName: string;
  stop: boolean;
}
