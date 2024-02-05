export interface Ticket {
  id: number;
  createdAt: Date;
  quoteId: number;
  price: number;
  direct: boolean;
  quoteDateTime: Date;
  inboundLeg: [
    {
      iataCode: string;
      placeName: string;
      carrierName: string;
      departureDate: Date;
    },
  ];
  outboundLeg: [
    {
      iataCode: string;
      placeName: string;
      carrierName: string;
      departureDate: Date;
    },
  ];
  image: string;
}
