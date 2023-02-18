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
            <p className="card-title">{title}</p>
            <p className="card-rating">
              <BsFillStarFill color="#fcc035" className="star-icon-card" />
              {rating}
            </p>
          </div>
        </div>
        <div className="location-employment-conatiner">
          <p className="location-card">
            <MdLocationOn className="location-icon" />
            {location}
          </p>
          <p className="location-card">
            <MdWork className="location-icon" />
            {employmentType}
          </p>
          <p className="package-card">{packagePerAnnum}</p>
        </div>
        <hr className="card-separator-line" />
        <p className="description-heading">Description</p>
        <p className="card-description">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobCard
