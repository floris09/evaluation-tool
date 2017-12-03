# Student Evaluation Tool

React Application for evaluating students based on their performance. 

**Features:**
- Add Batch
- Add and remove students
- Assign evaluations to students (Red, Yellow or Green)
- Random student picker (50% chance to get a red student, 33.3% chance yellow, 16.6% chance green.

**To Do:**
- Delete Batch
- Edit batch and students
- Delete and edit evaluations

[![](https://github.com/floris09/evaluation-tool-react/blob/master/src/images/Screen%20Shot%202017-12-03%20at%2022.08.06.png)](https://github.com/floris09/evaluation-tool-react/blob/master/src/images/Screen%20Shot%202017-12-03%20at%2022.08.06.png =100x)

[![](https://github.com/floris09/evaluation-tool-react/blob/master/src/images/Screen%20Shot%202017-12-03%20at%2022.09.38.png)](https://github.com/floris09/evaluation-tool-react/blob/master/src/images/Screen%20Shot%202017-12-03%20at%2022.09.38.png)

[![](https://github.com/floris09/evaluation-tool-react/blob/master/src/images/Screen%20Shot%202017-12-03%20at%2022.10.17.png)](https://github.com/floris09/evaluation-tool-react/blob/master/src/images/Screen%20Shot%202017-12-03%20at%2022.10.17.png)

## Database Structure

1. Batch

  * batchNumber: string
  * startDate: date
  * endDate: date
  
2. Evaluation

  * date: date
  * color: string
  * remark: string
  * student_id: objectId
  
3. Student

  * name: string
  * imageUrl: string
  * batch_id: objectId
  * color: string
  
4. User
  
  * name: string
  * email: string
  * createdAt: date
  * updatedAt: date

## Running Locally

Make sure you have [Yarn](https://yarnpkg.com/en/) and [NodeJS](https://nodejs.org/en/) installed, and the [backend](https://github.com/ff05/evaluation-tool-api) up and running.

```bash
git clone git@github.com:floris09/evaluation-tool-react.git
cd evaluation-tool-react
yarn install
yarn start
```
