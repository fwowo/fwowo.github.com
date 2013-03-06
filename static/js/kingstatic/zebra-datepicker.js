$('#J-date1').Zebra_DatePicker();

$('#J-date2').Zebra_DatePicker({
	direction: true, // true or 1 or [1, 10] or ['2012-08-01', '2012-08-12'] or ['2012-08-01', false]
	disabled_dates: ['* * * 0,6'] // days months years weekday
});

$('#J-date3-start').Zebra_DatePicker({
	direction: true,
	pair: $('#J-date3-end')
});
$('#J-date3-end').Zebra_DatePicker({
    direction: true
});

$('#J-date4').Zebra_DatePicker({
	format: 'M d, Y'
});

$('#J-date5').Zebra_DatePicker({
	show_week_number: 'Wk'
});

$('#J-date6').Zebra_DatePicker({
	view: 'years'
});

$('#J-date7').Zebra_DatePicker({
	onChange: function(view, elements) {
		console.log(view);
		console.log(elements);
	}
});

$('#J-date8').Zebra_DatePicker({
	always_visible: $('#dateplace')
});