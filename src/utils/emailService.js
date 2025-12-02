
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

export const sendOrderConfirmationEmail = async (orderDetails) => {
    try {
        // Format the items list for the email body
        const itemsList = orderDetails.items.map(item =>
            `- ${item.product.title} (Qty: ${item.quantity}) - ${item.product.price * item.quantity}`
        ).join('\n');

        // Construct the email message
        const message = `
      Order Confirmation
      ------------------
      Order Number: ${orderDetails.orderNumber}
      Total Amount: ${orderDetails.totalAmount}
      Estimated Delivery: ${orderDetails.deliveryDate}

      Items:
      ${itemsList}

      Shipping To:
      ${orderDetails.firstName}
      ${orderDetails.email}
    `;

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                access_key: ACCESS_KEY,
                subject: `Order Confirmation ${orderDetails.orderNumber}`,
                name: orderDetails.firstName,
                email: orderDetails.email,
                message: message,
            }),
        });

        const result = await response.json();

        if (result.success) {
            console.log('Email sent successfully!', result);
            return { success: true };
        } else {
            console.error('Failed to send email:', result);
            return { success: false, error: result };
        }
    } catch (error) {
        console.error('Failed to send email:', error);
        return { success: false, error };
    }
};
