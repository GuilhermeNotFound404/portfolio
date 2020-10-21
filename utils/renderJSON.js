import Input from '../components/Input'
import Add from '../components/Add'

const components = {
  "input": (props) => {
    console.log(props)
    return (
      <Input
        {...props}
      />
    )
  },
  "label_input": (input) => {

    console.log(input.key)

    return (
      <>
        <label>{input.key.replaceAll('_', ' ')} »</label>
        <Input
          {...input}
        />
      </>
    )
  },
  "array": (data) => (
    <>
      <label>{data.key}</label>
      <button>+</button>
    </>
  ),
  "array_objects": (data) => (
    <>
      <label>{data.key}</label>
      <Add style={{
        width: '64px !important',
        height: '64px !important'
      }}>+</Add>
    </>
  ),
  "object_inputs": (data, key) => {
    const { inputs } = data

    return (
      <div
        style={{
          flexDirection: 'column',
          marginLeft: '5px'
        }}
      >
        {Object.keys(inputs).map((inputKey, index) => {
          let input = inputs[inputKey]

          input.key = inputKey || key
          console.log(input.key)

          return components[input.data_type](input)
        })}
      </div>
    )
  },
}

export default (key, data) => {
  return components[data.data_type]
}
