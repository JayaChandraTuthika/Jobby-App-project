import JobCard from '../JobCard'

import './index.css'

const JobsList = props => {
  const {jobsList} = props
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

export default JobsList
