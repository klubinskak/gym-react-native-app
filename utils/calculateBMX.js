export const calculateBMX = (data) => {
    const height_convert = data.height / 100;
    if (data.gender == "male") {
      data.BMR = Math.round(
        66.47 + 13.75 * data.weight + 5 * data.height - 6.75 * data.age
      );
    } else {
      data.BMR = Math.round(
        665.09 + 9.56 * data.weight + 1.85 * data.height - 4.67 * data.age
      );
    }
    data.BMI = Math.round(data.weight / Math.pow(height_convert, 2));
  };


  export const checkBMI = (BMI) => {
    if(BMI > 18.5 && BMI < 25) {
      setMessage('You have a normal body weight. Good job!');
      state.status = 'NORMAL'
      state.color = 'green-500'
    } if (BMI < 18.5) {
      setMessage('You have underweight body weight.')
      state.status = 'UNDERWEIGHT'
      state.color = 'red-500'
    } if (BMI> 25) {
      setMessage('You have overweight body weight.')
      state.status= 'OVERWEIGHT';
      state.color = 'orange-500'
    }
  }