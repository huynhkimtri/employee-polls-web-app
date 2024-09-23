export function formatDate(timestamp) {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString("en-US");
  return time.substr(0, 5) + time.slice(-2) + " | " + d.toLocaleDateString();
}

export const formatPercentVoteOption = (poll) => {
  if (poll) {
    const voteOptionOne = poll.optionOne.votes.length || 0;
    const voteOptionTwo = poll.optionTwo.votes.length || 0;

    const totalVotes = voteOptionOne + voteOptionTwo;
    const percentageOptionOne = totalVotes
      ? (voteOptionOne / totalVotes) * 100
      : 0;
    const percentageOptionTwo = totalVotes
      ? (voteOptionTwo / totalVotes) * 100
      : 0;
    return { percentageOptionOne, percentageOptionTwo };
  }
};
