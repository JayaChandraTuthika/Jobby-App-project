import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'

import {MdWork, MdLocationOn} from 'react-icons/md'

import './index.css'

const SimilarCardItem = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails

  return (
    <li className="job-specific-details-container-1">
      <Link to={`/jobs/${id}`} className="link-style-similar-cards">
        <div className="logo-title-rating-container-1">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
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

        <h1 className="description-heading-2">Description</h1>
        <p className="card-description-2">{jobDescription}</p>
        <div className="location-employment-conatiner-1">
          <p className="location-card-1">
            <MdLocationOn className="location-icon-1" />
            {location}
          </p>
          <p className="location-card-1">
            <MdWork className="location-icon-1" />
            {employmentType}
          </p>
        </div>
      </Link>
    </li>
  )
}

export default SimilarCardItem
