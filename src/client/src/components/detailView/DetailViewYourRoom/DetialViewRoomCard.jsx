

import React, { Component } from "react";
import styles from "./DetailViewYourRoom.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStar, faCheckCircle, faFan, faTv, faBed } from "@fortawesome/free-solid-svg-icons";
import { faStar ,faCheckCircle, faFan,  faToilet, faPersonBooth, faMusic,faHandHoldingWater,faMoneyBillWave,faBreadSlice,faWifi,faFire, faHotTub, faBed,faCheese, faRestroom,faParking,faThermometerEmpty, faChair, faTv, faSoap} from "@fortawesome/free-solid-svg-icons"
import {hotelEntityDataRequest,hotelBillingDataRequest,hotelReviewDataRequest} from "../../../redux/authentication/actions"
import {connect} from "react-redux"


 class DetailViewRoomCard extends Component {

  constructor(props){
    super(props);
    this.state={
      showFontIcon:false
    }
  }

  componentDidMount=()=>{
    const {hotelEntityDataRequest,hotelBillingDataRequest,hotelReviewDataRequest} = this.props
    // hotelReviewDataRequest(10)
  }
  handleChange=(id)=>{
    
    const {data,selected,entityData,hotelId,hotelBillingDataRequest} = this.props
    const {offer,check_in,check_out,no_of_rooms,no_of_guests} = selected
    hotelEntityDataRequest(10)
     hotelBillingDataRequest({
      hotel_id:hotelId,
      room_id:id,
      check_in,
      check_out,
      no_of_guests,
      no_of_rooms,
      membership: offer.membership
    })
  }
  
  render() {
    const {data,selected,entityData} = this.props
    console.log(data,selected)
    const {showFontIcon}  =this.state
    const {handleChange} = this
    console.log(data,selected)
    console.log(entityData,"amenities")
    let amenities = []
    let amenities2 = []
    if(entityData){

       entityData.amenities.map(ele=>{
        if(ele.status){
          amenities2.push(ele)
        }
        if(amenities.length<3){
          amenities.push(ele)
        }

      })
    }
    return (
      <>
        
        <div className="px-4">
          <div className="card mb-3 w-100">
            <div className="d-flex" id={styles.header}>
              <div className="m-0">
                <span id={styles.off}>
                  <FontAwesomeIcon icon={faStar} color="yellow" size="sm" />
                </span>
              </div>
              {/* {
                selected.id === data.id?(
                    
              <div>
                <span id={styles.selected}>SELECTED CATEGORY</span>
              </div>
                ):""
              } */}
            </div>
            <div className="row no-gutters">
              <div className="col-md-8">
                <div className="card-body p-4">
                  <span className="card-title m-0" id={styles.subHeading}>
                    {data.type}
                  </span>
                  <span>
                    {" "}
                    <FontAwesomeIcon icon={faCheckCircle} color="lightgreen" size="lg" />
                  </span>
                  <div id={styles.roomSize}>Room size: {data.size} sqft</div>
                  <div className="mt-5 ml-0">
                  {
                     !showFontIcon && amenities && amenities.map(ele=>(
                    <span>
                      <span>
                        <FontAwesomeIcon icon={faFan} color="#000" size="sm" />
                      </span>
                      <span>{ele.label}</span>
                    </span>
                      ))
                    }
                    {
                     showFontIcon && amenities2 && amenities2.map(ele=>(
                    <span>
                      <span>
                        <FontAwesomeIcon icon={faFan} color="#000" size="sm" />
                      </span>
                      <span>{ele.label}</span>
                    </span>
                      ))
                    }
                    <span onClick={()=>this.setState({showFontIcon:!showFontIcon})}>+ {!showFontIcon?amenities2.length - amenities.length+"more":"less"}</span>
                 
                  </div>
                </div>
              </div>
              <div className="col-md-4 p-3">
                <img src="/images/bed.webp" className="card-img" alt="..." />
              </div>
              <div className="col-md-12 border-top ">
                <div className="d-flex justify-content-between p-2">
                  <div className="d-flex justify-content-between  align-items-center">
            <span id={styles.price}>₹{data.actual_price}</span>
                    {/* <span id={styles.slashPrice}>₹6378</span> */}
            <span id={styles.discPrice}>disc. {data.discount_percentage}%</span>
                  </div>
                  <div>
                    <button onClick={()=>handleChange(data.id)} id={styles.whiteBtn}>
                      <span className="m-0">
                        <FontAwesomeIcon icon={faCheckCircle} size="sm" />
                      </span>
                     
                          <span>Select</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
    user: state.auth.user,
    entityData: state.auth.entityData,
    review: state.auth.review,
    billingData:state.auth.billingData,
    hotelId:state.auth.hotelId
});

const mapDispatchToProps = (dispatch) => ({
  hotelEntityDataRequest: (payload) => dispatch(hotelEntityDataRequest(payload)), 
  hotelBillingDataRequest: (payload) => dispatch(hotelBillingDataRequest(payload)), 
  hotelReviewDataRequest: (payload) => dispatch(hotelReviewDataRequest(payload)), 
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailViewRoomCard);
