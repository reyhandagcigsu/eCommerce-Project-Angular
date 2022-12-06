

export interface IProduct  {
     id: number;
     title: string;
     price: number;
     description: string;
     key: string;
     category: string;
     image: string;
     rating: {
      rate: number;
      count: number;
    };
    userId?: string;
  }
  
  