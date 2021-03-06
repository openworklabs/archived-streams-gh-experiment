import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { BR_PINK } from '../../styled/themes'
import { EventObjectContainer } from '../events/Event'
import Group from './Group'
import { filterEvents } from '../../utils'
import { useFilters } from '../../hooks'

const UserBranchAndIssueGroup = ({ title, events }) => {
  const [open, setOpen] = useState(false)
  const [filteredEvents, setFilteredEvents] = useState({
    today: [],
    yesterday: [],
    lastWeek: [],
    lastMonth: [],
    catchAll: []
  })
  const { filters } = useFilters()

  useEffect(() => {
    const filteredEvents = {}

    Object.keys(events).forEach(timeDelineation => {
      filteredEvents[timeDelineation] = events[timeDelineation].filter(
        filterEvents(filters)
      )
    })
    setFilteredEvents(filteredEvents)
  }, [events, filters])
  return (
    <GroupContainer onClick={() => setOpen(!open)}>
      <Group title={title} events={filteredEvents} open={open} />
    </GroupContainer>
  )
}
UserBranchAndIssueGroup.propTypes = {
  title: PropTypes.string.isRequired,
  events: PropTypes.object.isRequired
}
const GroupContainer = styled(EventObjectContainer)`
  background: ${BR_PINK};
  cursor: pointer;
  display: flex;
  flex-direction: column;
`

export default UserBranchAndIssueGroup
