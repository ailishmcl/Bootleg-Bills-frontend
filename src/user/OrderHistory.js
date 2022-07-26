import React from 'react'

export default function OrderHistory(props) {
  return (
    <div>
        <table>
            <thead>
            <tr>
                <th>Order Ref.</th>
                <th>Order Status</th>
            </tr>
            </thead>
            <tbody>
                <tr>
                    <td>#000005</td>
                    <td>Complete</td>
                </tr>
                <tr>
                    <td>#000004</td>
                    <td>Shipped</td>
                </tr>
                <tr>
                    <td>#000003</td>
                    <td>Processed</td>
                </tr>
                <tr>
                    <td>#000002</td>
                    <td>Processing</td>
                </tr>
                <tr>
                    <td>#000001</td>
                    <td>New</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}
