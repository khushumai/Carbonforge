// payment.js

export const initiatePayment = (amount, onSuccess, onFailure) => {
    // Mock implementation of HyperSwitch payment
    // Replace this with actual HyperSwitch SDK integration

    // For demonstration, simulate payment with a timeout
    console.log(`Initiating payment of $${amount}`);
    setTimeout(() => {
        const paymentSuccessful = true; // Simulate payment success
        if (paymentSuccessful) {
            console.log('Payment successful');
            onSuccess({ transactionId: 'mockTransactionId123', amount });
        } else {
            console.log('Payment failed');
            onFailure('Payment failed');
        }
    }, 2000);
};
