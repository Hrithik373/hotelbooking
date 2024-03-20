import "./mailList.css"

const MailList = () => {
  return (
    <div className="mail">
      <h1 className="mailTitle">Stay in the know</h1>
      <span className="mailDesc">Sign up to get marketing emails from Booking.com, including promotions, rewards, travel experiences, and information about Booking.com and Booking.com Transport Limited’s products and services.</span>
      <div className="mailInputContainer">
        <input type="text" placeholder="Your Email" />
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default MailList