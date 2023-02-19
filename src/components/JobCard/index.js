import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'

import {MdWork, MdLocationOn} from 'react-icons/md'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    id,
    title,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
  } = jobDetails
  return (
    <li className="job-card-container">
      <Link to={`/jobs/${id}`} className="link-type">
        <div className="logo-title-rating-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="title-container">
            <h1 className="card-title">{title}</h1>
            <div className="tex-icon-containers">
              <BsFillStarFill color="#fcc035" className="star-icon-card" />
              <p className="card-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-employment-conatiner">
          <div className="tex-icon-containers">
            <MdLocationOn className="location-icon" />
            <p className="location-card">{location}</p>
          </div>
          <div className="tex-icon-containers">
            <MdWork className="location-icon" />
            <p className="location-card">{employmentType}</p>
          </div>

          <p className="package-card">{packagePerAnnum}</p>
        </div>
        <hr className="card-separator-line" />
        <h1 className="description-heading">Description</h1>
        <p className="card-description">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobCard
