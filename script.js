

function reverseStr(str) {
  var listOfChars = str.split('');

  var reverseListOfCharacters = listOfChars.reverse();
  var reversedStr = reverseListOfCharacters.join('')

  return reversedStr;
}




function isPalindrome(str) {
  var reverse = reverseStr(str);

  return str === reverse;
}





function convertDateToStr(date) {
  var dateStr = { day: '', month: '', year: '' };

  //for checking if day is less than 10
  if (date.day < 10) {
    dateStr.day = '0' + date.day;
  } else {
    dateStr.day = date.day.toString();
  }


  //for checking if month is less than 10
  if (date.month < 10) {
    dateStr.month = '0' + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  //for checking year is less than 10
  if (date.year < 10) {
    dateStr.year = '0' + date.year;
  } else {
    dateStr.year = date.year.toString();
  }

  return dateStr;
}


function getAllDateFormats(date) {
  var dateStr = convertDateToStr(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
  var listOfPalindromes = getAllDateFormats(date);


  var flag = false;

  for (var i = 0; i < listOfPalindromes.length; i++) {
    if (isPalindrome(listOfPalindromes[i])) {
      flag = true;
      break;
    }
  }

  return flag;

};

//for Next palindrome date and how many days are there in between
// but before creating getNextPalindromeDate we create a function that simply takes a date
// increments it and returns a new date
// we would also a leap year function

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }

  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}


function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  //Here we check for february month
  if (month === 2) {
    //check for leap year
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }

  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  //for year part
  if (month > 12) {
    month = 1;
    year++;
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}


function getPreviousDate(date) {
  var day = date.day - 1;//decrement
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day === 0) {
    month--;  //Yha pe yeh pichle mahine pe janek liye lagaya
    if (month === 0) {
      day = 31;
      month = 12;
      year--;       // yah pe pichle saal pe jane k lliye laagaya
    } else {
      if (isLeapYear(year)) {
        if (month === 2) {
          if (day > 29) {
            day = 1;
            month--;
          } else {
            if (day > 28) {
              day = 1;
              month--;
            }
          }
        }
      }
    }
  }
  else {
    day = daysInMonth[month - 1]; // yha pe sare pichle month pe jane k liye
  }
  return {
    day: day,
    month: month,
    year: year
  };
}


function getNextPalindromeDate(date) {
  var ctr = 0;
  var nextDate = getNextDate(date);

  while (1) {
    ctr++;
    var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [ctr, nextDate];

}

function getPreviousPalindromeDate(date) {
  var ctr = 0;
  var previousDate = getPreviousDate(date);

  while (1) {
    ctr++;
    var isPalindrome = checkPalindromeForAllDateFormats(previousDate);
    if (isPalindrome) {
      break;
    }
    previousDate = getPreviousDate(previousDate);
  }
  return [ctr, previousDate];
}


var bdayInput = document.querySelector('#bday-input');
var showBtn = document.querySelector('#show-btn');
var resultRef = document.querySelector('#result');

function clickHandler(e) {
  var bdayStr = bdayInput.value;

  if (bdayStr !== '') {
    var listOfDate = bdayStr.split('-');
    var date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0])
    };

    var isPalindrome = checkPalindromeForAllDateFormats(date);

    if (isPalindrome) {
      resultRef.innerText = 'Yay! your Birthday is a palindrome!! 🥳🥳'
    } else {
      var [ctr, nextDate] = getNextPalindromeDate(date);
      resultRef.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you misssed it by ${ctr} days! 😌`
    }
  }

}


showBtn.addEventListener('click', clickHandler);