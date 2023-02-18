import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Cookies from 'js-cookie'

import {MdWork, MdLocationOn} from 'react-icons/md'
import Header from '../Header'
import SimilarCardItem from '../SimilarCardItem'

import './index.css'

const statusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobSpecificDetails extends Component {
  state = {status: statusConstants.initial, similarJobs: {}, jobDetails: {}}

  componentDidMount() {
    this.getJobFUllDetails()
  }

  componentDidUpdate(prevProps) {
    const {match} = this.props
    if (prevProps.match.params.id !== match.params.id) {
      this.getJobFUllDetails()
    }
  }

  getJobFUllDetails = async () => {
    this.setState({status: statusConstants.inProgress})
    const {match} = this.props
    const {id} = match.params
    // console.log(id)
    const jwtToken = Cookies.get('jwt_token')

    const getJobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(getJobDetailsApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const jobDetails = data.job_details
      const similarJobs = data.similar_jobs
      const updatedJobDetails = {
        id: jobDetails.id,
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        jobDescription: jobDetails.job_description,
        lifeAtCompany: jobDetails.life_at_company,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        skills: jobDetails.skills,
        title: jobDetails.title,
      }
      const updatedSimilarJobs = similarJobs.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        status: statusConstants.success,
        jobDetails: updatedJobDetails,
        similarJobs: updatedSimilarJobs,
      })
    } else {
      this.setState({status: statusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      title,
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
    } = jobDetails

    return (
      <>
        <div className="job-specific-details-container">
          <div className="logo-title-rating-container-1">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo-1"
            />
            <div className="title-container-1">
              <h1 className="card-title-1">{title}</h1>
              <p className="card-rating-1">
                <BsFillStarFill color="#fcc035" className="star-icon-card-1" />
                {rating}
              </p>
            </div>
          </div>
          <div className="location-employment-conatiner-1">
            <p className="location-card-1">
              <MdLocationOn className="location-icon-1" />
              {location}
            </p>
            <p className="location-card-1">
              <MdWork className="location-icon-1" />
              {employmentType}
            </p>
            <p className="package-card-1">{packagePerAnnum}</p>
          </div>
          <hr className="card-separator-line-1" />
          <h1 className="description-heading-1">
            Description
            <a className="visit-link" href={companyWebsiteUrl}>
              Visit <FiExternalLink className="visit-link-icon" />
            </a>
          </h1>
          <p className="card-description-1">{jobDescription}</p>
          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-container">
            {skills.map(each => (
              <li className="skill-card-container" key={each.name}>
                <img
                  src={each.image_url}
                  className="skill-image"
                  alt={each.name}
                />
                <p className="skill-name">{each.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="skills-heading">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="life-at-company-description">
              {lifeAtCompany.description}
            </p>
            <img
              src={lifeAtCompany.image_url}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {similarJobs.map(eachJob => (
            <SimilarCardItem jobDetails={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </>
    )
  }

  onRetry = () => {
    this.getJobFUllDetails()
  }

  renderFailureView = () => (
    <div className="failure-container-2">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img-2"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para-1 ">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retry-profile-btn"
        onClick={this.onRetry}
      >
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container-2" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="60" />
    </div>
  )

  render() {
    const {status} = this.state
    let content
    switch (status) {
      case statusConstants.success:
        content = this.renderSuccessView()
        break
      case statusConstants.failure:
        content = this.renderFailureView()
        break
      case statusConstants.inProgress:
        content = this.renderLoader()
        break
      default:
        content = null
        break
    }
    return (
      <div className="bg-container-1">
        <Header />
        {content}
      </div>
    )
  }
}

export default JobSpecificDetails
