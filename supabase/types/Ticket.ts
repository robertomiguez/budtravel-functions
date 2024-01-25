export interface Ticket {
  id: number;
  created_at: Date;
  quote_id: number;
  price: number;
  direct: boolean;
  quote_date_time: Date;
  inboundLeg: {
    iataCode: string;
    placeName: string;
    carrierName: string;
    departureDate: Date;
  };
  outboundLeg: {
    iataCode: string;
    placeName: string;
    carrierName: string;
    departureDate: Date;
  };
  image: string;
}
