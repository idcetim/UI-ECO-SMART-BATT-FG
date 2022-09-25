import '../styles/loading.css'
export const Loading = (props) => {
  return (
    <div class="ring">
      {props.text}
      <span className='span-loading'></span>
    </div>
  )
}