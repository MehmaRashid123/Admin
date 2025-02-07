// schemas/order.ts
export default {
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
      {
        name: 'firstName',
        title: 'First Name',
        type: 'string',
      }, 
      {
        name: 'lastName',
        title: 'Last Name',
        type: 'string', 
      },
      {
        name: 'address',
        title: 'Address',
        type: 'string', 
      },
      {
        name: 'city',
        title: 'City',
        type: 'string', 
      },
      {
        name: 'zipCode',
        title: 'Zip Code',
        type: 'string',
      },
      {
        name: 'phone',
        title: 'Phone',
        type: 'string',
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
      },
      {
        name: 'cartItems',
        title: 'Cart Items',
        type: 'array',
        of: [{ type :'reference', to : { type : 'product'}}]
      },
      {
        name: 'total',
        title: 'Total',
        type: 'number',
      },
      {
        name: 'status',
        title: 'Status',
        type: 'string',
        options: {
          list: [{title: 'Pending', value : 'pending'},
             {title: 'Shipped', value :'shipped'} ,
             {title: 'Delivered', value : 'delivered'} ,
             {title: 'Cancelled', value : 'canclled'}], 
             layout : 'radio'
        },
        initialValue : 'pending'
      },
    ],
  };
  