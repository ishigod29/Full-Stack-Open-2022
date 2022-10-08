import React from 'react'
import { toggleVoteOf } from '../reducers/anecdoteReducer'
import { notification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const Anecdote = ({ anecdote,props }) => {

  const voteHandler = (id) => {
    props.toggleVoteOf(anecdote)
    //Notification
    props.notification(`you voted '${anecdote.content}'`, 5)
  }
  return (
    <li style={{ marginBottom: '20px' }}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={voteHandler}>vote</button>
      </div>
    </li>
  )
}

const AnecdoteList = (props) => {
  const orderByVotes = (a1, a2) => a2.votes - a1.votes
  return (
    <ul>
      {props.anecdotes.sort(orderByVotes).map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} props={props} />
      ))}
    </ul>
  )
}

const mapToStateToProps = (state) => {
  if (state.filter === null) {
    return {anecdotes: state.anecdotes}
  }
  const regex = new RegExp(state.filter, 'i')
  return {
    anecdotes: (state.anecdotes.filter((anecdote) => anecdote.content.match(regex)))
  }
}

export default connect(mapToStateToProps, {toggleVoteOf, notification})(AnecdoteList)
