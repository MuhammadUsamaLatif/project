import React, { Component, } from 'react';
import { connect } from 'react-redux';
import { getAllUsers } from '../Redux/Actions/users/user-actions';
import { getAllStaff } from '../Redux/Actions/staff/staff-actions';
import { getAllComplaints } from '../Redux/Actions/complaints/complaints-action';
import { getAllDemands } from '../Redux/Actions/demands/demands-actions';
import { getAllFeedbacks } from '../Redux/Actions/feedbacks/feedback-actions';
import CardComp from './card';
import { Loading } from './Loading';
class Landing extends Component {
  state = {
    isLoading: true,
  }
  componentDidMount() {
    this.props.dispatch(getAllUsers())
    this.props.dispatch(getAllStaff())
    this.props.dispatch(getAllComplaints())
    this.props.dispatch(getAllDemands())
    this.props.dispatch(getAllFeedbacks())
    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 5000);
  }
  render() {
    const { isLoading } = this.state
    if (isLoading) {
      return (
        <Loading 
        title="Please wait..."
        />
      )
    }
    const { userTotals } = this.props.users
    const { staffTotals } = this.props.staff
    const { totalComplaints } = this.props.complaints
    const { totalDemands } = this.props.demands
    const { totalFeedbacks } = this.props.feedbacks
    return (
      //Users
      <div className="landingContainer">
        <div className="cards-div">
          <div>
            <CardComp
              title="Total Customers"
              userTotals={userTotals}
              route="/customers"
            />
          </div>
          {/* Staff */}
          <div>
            <CardComp
              title="Total Staff"
              userTotals={staffTotals}
              route="/staff"
            />
          </div>
          {/* Complaints */}
          <div>
            <CardComp
              title="Total Complaints"
              userTotals={totalComplaints}
              route="/complaints"
            />
          </div>
          {/* Movies Demands */}
          <div>
            <CardComp
              title="Total Movie Demands"
              userTotals={totalDemands}
              route="/demands"

            />
          </div>
          {/* Feedbacks */}
          <div>
            <CardComp
              title="Total Feedbacks"
              userTotals={totalFeedbacks}
              route="/feedbacks"
            />
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (store) => {
  return {
    auth: store.auth,
    users: store.allUsers.allUsers,
    staff: store.allStaff.allStaff,
    complaints: store.allComplaints.allComplains,
    demands: store.allDemands.allDemands,
    feedbacks: store.allFeedback.allFeedbacks
  }
}
export default connect(mapStateToProps)(Landing);
