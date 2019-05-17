// This loader will simply replace all $something sass-variable with @something less-variables
export default function (source) {
  return source.replace(/\$/ig, '@');
}
