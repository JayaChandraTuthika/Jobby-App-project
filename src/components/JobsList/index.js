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

      activeSearchText: '',
    }
  }

  //   componentDidMount() {
  //     this.getJobsList()
  //   }

  //   componentDidUpdate(prevProps) {
  //     const {typesOfEmployment, selectedSalaryRange} = this.props
  //     if (prevProps !== this.props) {
  //       this.getJobsList()
  //     } else if (
  //       prevProps.typesOfEmployment.length !== typesOfEmployment.length
  //     ) {
  //       this.getJobsList()
  //     } else if (prevProps.selectedSalaryRange !== selectedSalaryRange) {
  //       this.getJobsList()
  //     }
  //   }

  //   getJobsList = async () => {
  //     this.setState({status: statusConstants.inProgress})
  //     const {typesOfEmployment, selectedSalaryRange} = this.props
  //     // console.log(typesOfEmployment)
  //     const {searchInput} = this.state
  //     const jwtToken = Cookies.get('jwt_token')
  //     const joinedTypesOfEmplayment = typesOfEmployment.join(',')
  //     const getJobsUrl = `https://apis.ccbp.in/jobs?employment_type=${joinedTypesOfEmplayment}&minimum_package=${selectedSalaryRange}&search=${searchInput}`
  //     const options = {
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Bearer ${jwtToken}`,
  //       },
  //     }
  //     const response = await fetch(getJobsUrl, options)
  //     if (response.ok === true) {
  //       const data = await response.json()
  //       const jobsData = data.jobs
  //       //   console.log(jobsData)
  //       const updatedJobsData = jobsData.map(each => ({
  //         id: each.id,
  //         title: each.title,
  //         companyLogoUrl: each.company_logo_url,
  //         employmentType: each.employment_type,
  //         jobDescription: each.job_description,
  //         location: each.location,
  //         packagePerAnnum: each.package_per_annum,
  //         rating: each.rating,
  //       }))
  //       //   console.log(updatedJobsData)
  //       this.setState({
  //         jobsList: updatedJobsData,
  //         status: statusConstants.success,
  //       })
  //     } else {
  //       this.setState({status: this.statusConstants.failure})
  //     }
  //   }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  searchForJobs = () => {
    const {onSearchChange} = this.props
    const {searchInput} = this.state
    onSearchChange(searchInput)
  }

  renderJobsListContainer = () => {
    const {jobsList, activeSearchText} = this.props
    // console.log('here')

    // const filteredList = jobsList.filter(each =>
    //   each.title.toLowerCase().includes(activeSearchText.toLowerCase()),
    // )
    if (jobsList.length === 0) {
      return (
        <div className="failure-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="failure-img"
          />
          <h1 className="failure-heading">No Jobs Found</h1>
          <p className="failure-para-1 ">
            We could not find any jobs. Try other filters
          </p>
        </div>
      )
    }

    return (
      <ul className="jobs-list-container">
        {jobsList.map(each => (
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

  retry = () => {
    const {onRetry} = this.props
    this.getJobsList()
    onRetry()
  }

  //   renderFailureContainer = () => (
  //     <div className="failure-container">
  //       <img
  //         src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
  //         alt="failure view"
  //         className="failure-img"
  //       />
  //       <h1 className="failure-heading">Oops! Something Went Wrong</h1>
  //       <p className="failure-para-1 ">
  //         We cannot seem to find the page you are looking for
  //       </p>
  //       <button type="button" className="retry-profile-btn" onClick={this.retry}>
  //         Retry
  //       </button>
  //     </div>
  //   )

  render() {
    const {status, searchInput} = this.state

    // let page

    // switch (status) {
    //   case statusConstants.success:
    //     page = this.renderJobsListContainer()
    //     break
    //   case statusConstants.inProgress:
    //     page = this.renderLoader()
    //     break
    //   case statusConstants.failure:
    //     page = this.renderFailureContainer()
    //     break
    //   default:
    //     page = null
    //     break
    // }
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
            onClick={this.searchForJobs}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        {this.renderJobsListContainer()}
      </div>
    )
  }
}

export default JobsList
