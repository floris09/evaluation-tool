import {
  RANDOM_STUDENT_FETCHED
} from '../actions/students/fetch'

export default (state = [], { type, payload } = {}) => {
  switch (type) {

    case RANDOM_STUDENT_FETCHED :

      function algoArray(greenStudents,yellowStudents,redStudents){
        var array = []
        if (greenStudents.length !== 0) { for (var i=0; i<1; i++){ array.push(greenStudents) } }
        if (yellowStudents.length !== 0) { for (var x=0; x<2; x++){ array.push(yellowStudents) } }
        if (redStudents.length !== 0) { for (var y=0; y<3; y++){ array.push(redStudents) } }
        return array
      }

        const colorPicker = (theArray) => theArray[Math.floor(Math.random()*theArray.length)]
        const studentPicker = (arr) =>  arr[Math.floor(Math.random()*arr.length)]

        const students = [...payload]

        const greenStudents = students.filter(student => student.color === 'green')
        const yellowStudents = students.filter(student => student.color === 'yellow')
        const redStudents = students.filter(student => student.color === 'red')

        const theArray = algoArray(greenStudents,yellowStudents,redStudents)
        const theColor = colorPicker(theArray)
        const theStudent = studentPicker(theColor)

        return theStudent

        default :
          return state
  }
}
