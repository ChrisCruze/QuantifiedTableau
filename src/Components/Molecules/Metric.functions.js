export function footer_calculate(metric, goal) {
  var numerator = metric;
  var denominator = goal;
  return `${numerator}/${denominator}`;
}

export function label_calculate(metric, goal) {
  const percentage = metric / goal;
  return format_percentage_to_string_without_decimal(percentage);
}

export function label_color_calculate(metric, goal) {
  const percentage = metric / goal;
  if (percentage > 0.66) {
    return "#1ab394"; //green
  } else if (percentage > 0.33) {
    return "#f0ad4e"; //yellow
  } else {
    return "#d9534f"; //red
  }
}
