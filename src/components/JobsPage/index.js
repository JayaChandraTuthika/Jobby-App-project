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
    jobsList: [],
    typesOfEmployment: [],
    selectedSalaryRange: 0,
    searchInput: '',
    jobStatus: statusConstants.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsList()
  }

  onAddEmployment = id => {
    const {typesOfEmployment} = this.state
    const newList = [...typesOfEmployment, id]
    this.setState({typesOfEmployment: newList}, this.getJobsList)
  }

  onRemoveEmployment = id => {
    const {typesOfEmployment} = this.state
    const newList = typesOfEmployment.filter(each => each !== id)
    // console.log(newList)
    this.setState({typesOfEmployment: newList}, this.getJobsList)
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

  onSearchChange = text => {
    // console.log(text)
    this.setState({searchInput: text}, this.getJobsList)
  }

  getJobsList = async () => {
    this.setState({jobStatus: statusConstants.inProgress})
    const {typesOfEmployment, selectedSalaryRange, searchInput} = this.state
    console.log(searchInput)

    const jwtToken = Cookies.get('jwt_token')
    const joinedTypesOfEmplayment = typesOfEmployment.join(',')
    const getJobsUrl = `https://apis.ccbp.in/jobs?employment_type=${joinedTypesOfEmplayment}&minimum_package=${selectedSalaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(getJobsUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const jobsData = data.jobs
      //   console.log(jobsData)
      const updatedJobsData = jobsData.map(each => ({
        id: each.id,
        title: each.title,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
      }))

      this.setState({
        jobsList: updatedJobsData,
        jobStatus: statusConstants.success,
      })
    } else {
      this.setState({jobStatus: this.statusConstants.failure})
    }
  }

  renderProfile = () => {
    const {profileDetails} = this.state
    const {profileImageUrl, name, shortBio} = profileDetails
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-pic" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-short-bio">{shortBio}</p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="60" />
    </div>
  )

  onRetry = () => {
    this.getProfileDetails()
    this.getJobsList()
  }

  renderFailureContainer = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para-1 ">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="retry-profile-btn" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  render() {
    const {
      profileStatus,

      jobsList,
      jobStatus,
    } = this.state

    let profile

    switch (profileStatus) {
      case statusConstants.success:
        profile = this.renderProfile()
        break
      case statusConstants.failure:
        profile = (
          <div className="profile-failure-container">
            <button
              type="button"
              className="retry-profile-btn"
              onClick={this.onRetry}
            >
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

    let jobs
    switch (jobStatus) {
      case statusConstants.success:
        // console.log(jobsList)
        jobs = (
          <JobsList
            jobsList={jobsList}
            onRetry={this.onRetry}
            onSearchChange={this.onSearchChange}
          />
        )
        break
      case statusConstants.inProgress:
        jobs = this.renderLoader()
        break
      case statusConstants.failure:
        jobs = this.renderFailureContainer()
        break
      default:
        jobs = null
        break
    }
    return (
      <div className="jobs-bg-container">
        <Header />
        <div className="bottom-section">
          <div className="side-bar-container">
            {profile}
            <hr className="side-bar-separator-line" />
            <h1 className="filter-category-heading">Type of Employment</h1>
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
            <h1 className="filter-category-heading">Salary Range</h1>
            <ul className="employment-type-list-container">
              {salaryRangesList.map(each => {
                const onChangeSalary = event => {
                  this.setState(
                    {
                      selectedSalaryRange: parseInt(event.target.value),
                    },
                    this.getJobsList,
                  )
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
          {jobs}
        </div>
      </div>
    )
  }
}

export default JobsPage
