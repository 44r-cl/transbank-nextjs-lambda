// Archivo: pages/index.js

import { useState } from 'react';
const buyOrder = 'O-' + Math.floor(Math.random() * 10000) + 1;
const sessionId = 'S-' + Math.floor(Math.random() * 10000) + 1;
const returnUrl = 'http://localhost:3000/resultado-transaccion';
const amount = 10000;
const crearTransaccionUrl = 'https://ghdvnejabj.execute-api.us-east-2.amazonaws.com/dev/crear-transaccion';

export default function Home() {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);
        try {
            const response = await fetch(crearTransaccionUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    buyOrder,
                    sessionId,
                    returnUrl,
                    amount
                })
            });
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            const data = await response.json();
            console.log("Evento completo:", JSON.stringify(data, null, 2));
            window.location.href = `${data.url}?token_ws=${data.token}`;
        } catch (error) {
            console.error('Error al iniciar el pago:', error);
            alert('Error al iniciar el pago. Por favor, intente nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1>Ejemplo Webpay Plus/Next.js/Lambda</h1>
            <p>Haz clic en el botón para realizar un pago de $10.000 CLP con Webpay Plus</p>
            <button onClick={handlePayment} disabled={loading}>
                {loading ? 'Procesando...' : 'Pagar con Webpay'}
            </button>
            <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          font-family: Arial, sans-serif;
        }
        button {
          padding: 10px 20px;
          font-size: 16px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }
      `}</style>
        </div>
    );
}