import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import JobCard from '../JobCard'

import './index.css'

const statusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobsList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      jobsList: [],
      searchInput: '',
      status: statusConstants.initial,
    }
  }

  componentDidMount() {
    this.getJobsList()
  }

  componentDidUpdate(prevProps) {
    const {typesOfEmployment, selectedSalaryRange} = this.props
    if (prevProps !== this.props) {
      this.getJobsList()
    }
  }

  getJobsList = async () => {
    this.setState({status: statusConstants.inProgress})
    const {typesOfEmployment, selectedSalaryRange} = this.props
    // console.log(typesOfEmployment)
    const {searchInput} = this.state
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
      //   console.log(updatedJobsData)
      this.setState({
        jobsList: updatedJobsData,
        status: statusConstants.success,
      })
    } else {
      this.setState({status: this.statusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderJobsListContainer = () => {
    const {jobsList, searchInput} = this.state

    const filteredList = jobsList.filter(each =>
      each.title.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <ul className="jobs-list-container">
        {filteredList.map(each => (
          <JobCard jobDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="loader-container-jobs" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureContainer = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt=""
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para-1 ">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-profile-btn">
        Retry
      </button>
    </div>
  )

  render() {
    const {status, searchInput} = this.state

    let page

    switch (status) {
      case statusConstants.success:
        page = this.renderJobsListContainer()
        break
      case statusConstants.inProgress:
        page = this.renderLoader()
        break
      case statusConstants.failure:
        page = this.renderFailureContainer()
        break
      default:
        page = null
        break
    }
    return (
      <div className="jobs-container">
        <div className="search-input-container">
          <input
            type="search"
            className="search-input"
            placeholder="Search"
            onChange={this.onChangeSearchInput}
            value={searchInput}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="search-btn"
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        {page}
      </div>
    )
  }
}

export default JobsList
