import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import JobsList from '../JobsList'
import './index.css'

const statusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobsPage extends Component {
  state = {
    profileStatus: statusConstants.initial,
    profileDetails: {},
    typesOfEmployment: [],
    selectedSalaryRange: 0,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  onAddEmployment = id => {
    const {typesOfEmployment} = this.state
    const newList = [...typesOfEmployment, id]
    this.setState({typesOfEmployment: newList})
  }

  onRemoveEmployment = id => {
    const {typesOfEmployment} = this.state
    const newList = typesOfEmployment.filter(each => each !== id)
    // console.log(newList)
    this.setState({typesOfEmployment: newList})
  }

  getProfileDetails = async () => {
    this.setState({profileStatus: statusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const profileUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(profileUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const profileDetails = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      //   console.log(profileDetails)

      this.setState({
        profileStatus: statusConstants.success,
        profileDetails,
      })
    } else {
      this.setState({profileStatus: statusConstants.failure})
    }
  }

  //   renderJobsListComponent = () => {
  //     const {typesOfEmployment, selectedSalaryRange} = this.state
  //     console.log(this.props)
  //     return (
  //       <JobsList
  //         typesOfEmployment={typesOfEmployment}
  //         selectedSalaryRange={selectedSalaryRange}
  //       />
  //     )
  //   }

  renderProfile = () => {
    const {profileDetails} = this.state
    const {profileImageUrl, name, shortBio} = profileDetails
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-pic" />
        <p className="profile-name">{name}</p>
        <p className="profile-short-bio">{shortBio}</p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="60" />
    </div>
  )

  render() {
    const {profileStatus, typesOfEmployment, selectedSalaryRange} = this.state

    let profile

    switch (profileStatus) {
      case statusConstants.success:
        profile = this.renderProfile()
        break
      case statusConstants.failure:
        profile = (
          <div className="profile-failure-container">
            <button type="button" className="retry-profile-btn">
              Retry
            </button>
          </div>
        )
        break
      case statusConstants.inProgress:
        profile = this.renderLoader()
        break
      default:
        profile = null
        break
    }
    return (
      <div className="jobs-bg-container">
        <Header />
        <div className="bottom-section">
          <div className="side-bar-container">
            {profile}
            <hr className="side-bar-separator-line" />
            <h1 className="filter-category-heading">Types of Employment</h1>
            <ul className="employment-type-list-container">
              {employmentTypesList.map(each => {
                const onAddEmploymentType = event => {
                  if (event.target.checked) {
                    this.onAddEmployment(each.employmentTypeId)
                  } else {
                    this.onRemoveEmployment(each.employmentTypeId)
                  }
                }
                return (
                  <li
                    className="employment-type-list-item"
                    key={each.employmentTypeId}
                  >
                    <input
                      type="checkbox"
                      className="checkbox-input"
                      id={each.employmentTypeId}
                      onChange={onAddEmploymentType}
                    />
                    <label
                      className="label-input"
                      htmlFor={each.employmentTypeId}
                    >
                      {each.label}
                    </label>
                  </li>
                )
              })}
            </ul>
            <hr className="side-bar-separator-line" />
            <h1 className="filter-category-heading">Types of Employment</h1>
            <ul className="employment-type-list-container">
              {salaryRangesList.map(each => {
                const onChangeSalary = event => {
                  this.setState({
                    selectedSalaryRange: parseInt(event.target.value),
                  })
                }
                return (
                  <li
                    className="employment-type-list-item"
                    key={each.salaryRangeId}
                  >
                    <input
                      type="radio"
                      className="checkbox-input"
                      value={each.salaryRangeId}
                      id={each.salaryRangeId}
                      onChange={onChangeSalary}
                      name="salary"
                    />
                    <label className="label-input" htmlFor={each.salaryRangeId}>
                      {each.label}
                    </label>
                  </li>
                )
              })}
            </ul>
          </div>

          <JobsList
            typesOfEmployment={typesOfEmployment}
            selectedSalaryRange={selectedSalaryRange}
          />
        </div>
      </div>
    )
  }
}

export default JobsPage
