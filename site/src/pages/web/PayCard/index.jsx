import './index.scss'

export default function PayCard(){

 
    

    return(
       
       <main className='PayCard'>
<div class="checkout-panel">
  <div class="panel-body">
    <h2 class="title">Checkout here!</h2>
 
    <div class="progress-bar">
      <div class="step active"></div>
      <div class="step active"></div>
      <div class="step"></div>
      <div class="step"></div>
    </div>
 
    <div class="payment-method">
      <label for="card" class="method card">
        <div class="card-logos">
          <img src="https://designmodo.com/demo/checkout-panel/img/visa_logo.png"/>
          <img src="https://designmodo.com/demo/checkout-panel/img/mastercard_logo.png"/>
        </div>
 
        <div class="radio-input">
          <input id="card" type="radio" name="payment" required/>
          Pay AU$20.99 with credit card
        </div>
      </label>
 
      <label for="paypal" class="method paypal">
        <img src="https://designmodo.com/demo/checkout-panel/img/paypal_logo.png"/>
        <div class="radio-input">
          <input id="paypal" type="radio" name="payment" required/>
          Pay AU$20.99 with PayPal
        </div>
      </label>
    </div>
 
    <div class="input-fields">
      <div class="column-1">
        <label for="cardholder">Name</label>
        <input type="text" id="cardholder" required />
 
        <div class="small-inputs">
          <div>
            <label for="date">Valid date</label>
            <input type="text" id="date" required/>
          </div>
 
          <div>
            <label for="verification">CVV / CVC *</label>
            <input type="password" id="verification" required/>
          </div>
        </div>
 
      </div>
      <div class="column-2">
        <label for="cardnumber">Card Number</label>
        <input type="password" required id="cardnumber"/>
 
        <span class="info">* CVV or CVC is the card security code, unique three digits number on the back of your card separate from its number.</span>
      </div>
    </div>
  </div>
 
  <div class="panel-footer">
  <a href='/'> <button class="btn back-btn">Back</button></a> 
    <a href='/FimPay'><button className='btn netx-btn'>Next Stap</button></a> 
  </div>
</div>

      
        </main>        
    )
}