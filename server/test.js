// const order = 'order-user1-date'

// function getUserIdFromOrderId(orderId) {
//     const userId = orderId.split('-')[1]
//     return userId
// }

// console.log(getUserIdFromOrderId(order))

// const handlePayment = async () => {
//     const response = await fetch('/purchase', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ userId: 'USER_ID', amount: 10000 }) // Amount in your currency
//     });

//     const data = await response.json();
//     window.location.href = data.redirect_url; // Redirect to Midtrans payment page
// };

// return <button onClick={handlePayment}>Buy Coins</button>;

let updateQuery = {};

updateQuery = { $inc: { scoins: -100 } }

updateQuery.$push = { items: 1 }

console.log(updateQuery)