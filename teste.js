const person = [
    {
      name: 'Jim',
      color: 'blue',
      age: 22,
    },
    {
      name: 'Sam',
      color: 'blue',
      age: 33,
    },
    {
      name: 'Eddie',
      color: 'green',
      age: 77,
    },
  ];
  
  // Add their sum of ages
  const sumOfAges = person.reduce((sum, currentValue) => {
    return sum + currentValue.age;
  }, 0);
  
  console.log(sumOfAges);