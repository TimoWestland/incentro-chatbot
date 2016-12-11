var $ = window.jQuery;
var POST_URL = 'https://forms.hubspot.com/uploads/form/v2/1926778/e833db01-e035-43f0-836e-8c27d187e781';

$(function() {
    var $form = $('#conversational');
    var $chatForm = $('#conversational-form');

    // Set day or night greeting text and ending text
    var $greeting = $('#name');
    var greeting = checkDayOrNight() === 'day' ? 'Goedemiddag' : 'Goedeavond';
    var greetingText = $greeting.attr('cf-questions').replace('[greeting]', greeting);
    $greeting.attr('cf-questions', greetingText);
    var $final = $('#thats-all');
    var final = checkDayOrNight() === 'day' ? 'dag' : 'avond';
    var finalText = $final.attr('cf-questions').replace('[time]', final);
    $final.attr('cf-questions', finalText);

    if (!window.ConversationalForm) {
        window.ConversationalForm = new cf.ConversationalForm({
            formEl: document.getElementById("conversational"),
            context: document.getElementById("form-outer"),
            userImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJEAAACGCAYAAADdC2gAAAAAAXNSR0IArs4c6QAAIjlJREFUeAHtnQm0FcWZx/si7uK+oVGeC6DiDm64ABo14sqYoBIlKiSOOZkzmWQmcSaemTmT5MyJTiZnlkwykyjbgAlxEg0qCsoqGDUGl6DiFhSV4IYGRTHonf+v8+q+r+v2dt/t+9597906p2/17a6uqq7+97dXdSnog2nhwoX9X3rppQM//vjjoR999NFQDQHbHqVSaYByf9texz4ol8vvKt+gMhvI27e3lT+nY6uUr9phhx2eGT9+POX6VCr19rudPXv2Fu++++4IgWCM7vUkbUO1f6DyLRtx7wLUK6oXUK1QOwv1f8mkSZMAXa9NvQ5EenClqVOnHiUqc7qeGtupOrZjNz7BzQLSI+rDgn79+i0QtVomavV+N/an8KZ7DYimTJlyhIBzhUbos3pg+xQ+UgVVKEABoNu1TR8wYMA8Aeqjgqrutmp6NIgEnL0FnAkCDeA5upZR3H777YOddtqpsolCBFtttVWw5ZZbRrb+/fsHkpuCP/7xj8HmzZuDDz/8MNzn//vvvx+88847le0Pf/hDWf2pZUzXqc+ztM2YPHnyilr630xla7nhpun3TTfddJKA87d6q8cq3yKrY9ttt10wcODAcNt9991D4ACOopP6EmzYsCFYv3598OqrrwZr164N9/O0o3t5Qtt3DzjggJljxozZnOeaZinTo0D04x//+AwN9Df0sMakDaAoSnmfffYpaQuBs/POO6cVb+i5Dz74oAKoV155JQRZWoO6v9Xabth7771vHjt27Ka0ss1yrulBJMAgKJ8nNgF4TkgaOAmt5X333bd08MEHB4MGDQq22CKTQCVV1dDj69atC5577rngd7/7XXnTpk1p478WyiT2+sOJEye+19BO1Vl52k3UWXX9l998883HCjw/UE3HJ9UGewI4Bx10ULDNNtskFWu647qvQLaq4Nlnnw1efvnlRFlKQHpN29euvvrqaU13E+0dakoQSWDeWYP8LVGea9XPfnGDJ6oTHH300YHIftzpHnXsvffeCx5//PHgmWeeKUt4j30mAtL9orZfvOqqq55otpuL7XB3dlJC80S1f6MAtKffDw1kef/99y8BHihQb0toe7/97W+Dp556qiztL+7ZYHP6d933PzaTATOuo93y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',
            submitCallback: function() {
                var price = calcPrice($form.serializeArray());
                var range = calcRange(price);
                var $overlay = $('.chatbot-overlay');
                var $priceElem = $overlay.find('h1');
                $priceElem.text(range + '*');

                var $hidden = $('<input type="hidden" name="total_price"/>');
                $hidden.val(price);
                $form.append($hidden);

                $chatForm.hide();
                $overlay.addClass('_is_visible');

                // postToHubspot($form);
            }
        });
    }

});

var calcPrice = function(data) {
    console.log(data);
    var price = 0;

    data.forEach(function(item) {
        var name = item.name;
        var value = item.value;

        switch (name) {
            case 'website-size':
                switch (value) {
                    case 'klein':
                        price += 2500;
                        break;
                    case 'middel':
                        price += 7500;
                        break;
                    case 'groot':
                        price += 12500;
                        break;
                }
                break;

            case 'categorie-project':
                switch (value) {
                    case 'redesign':
                        price += 2500;
                        break;
                    case 'nieuw':
                        price += 5000;
                        break;
                }
                break;

            case 'huisstijl-aanwzig':
                switch (value) {
                    case 'ja':
                        price += 0;
                        break;
                    case 'nee':
                        price += 2500;
                        break;
                }
                break;

            case 'responsive':
                switch (value) {
                    case '1-tot-3':
                        price += 500;
                        break;
                    case '3-tot-5':
                        price += 1000;
                        break;
                    case 'meer-dan-5':
                        price += 1500;
                        break;
                }
                break;

            case 'mobile-first':
                switch (value) {
                    case 'ja':
                        price += 2500;
                        break;
                    case 'nee':
                        price += 0;
                        break;
                }
                break;

            case 'doel-website':
                switch (value) {
                    case 'informeren':
                        price += 500;
                        break;
                    case 'inspireren':
                        price += 1000;
                        break;
                    case 'converteren':
                        price += 1500;
                        break;
                }
                break;

            case 'interactie':
                switch (value) {
                    case 'geen':
                        price += 0;
                        break;
                    case 'weinig':
                        price += 1000;
                        break;
                    case 'veel':
                        price += 2000;
                        break;
                }
                break;

            case 'user-tests':
                switch (value) {
                    case 'nee':
                        price += 0;
                        break;
                    case 'gedeeltelijk':
                        price += 2000;
                        break;
                    case 'ja':
                        price += 4000;
                        break;
                }
                break;

            case 'overall-kwaliteit':
                switch (value) {
                    case 'bare-bones':
                        price += 500;
                        break;
                    case 'stock':
                        price += 1000;
                        break;
                    case 'beautiful':
                        price += 2000;
                        break;
                }
                break;
        }
    });

    return price;
};

var calcRange = function(price) {
    var priceLow = parseFloat(price * 0.9).toFixed(0);
    var priceHigh = parseFloat(price * 1.1).toFixed(0);
    return '€' + priceLow.toString() + ' - ' + '€' + priceHigh.toString();
};


var postToHubspot = function(event, $form) {
    $.ajax({
        type: 'POST',
        url: POST_URL,
        data: $form.serialize(),
        headers: {
            Accept: 'application/x-www-form-urlencoded'
        }
    });
};

var checkDayOrNight = function() {
    var now = new Date();
    var time = now.getHours();
    return time > 0 && time < 18 ? 'day' : 'night';
};
