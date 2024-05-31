import { ImageResponse } from 'next/og'
 
// Image metadata
export const size = {
  width: 42,
  height: 42,
}
export const contentType = 'image/png'
 
// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 30,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius:'15px',
        }}
      >
        <img src="https://i.ibb.co/MhD3Pbf/trip-nest-logo-removebg-preview.png" />
      </div>
    ),
    {
      ...size,
    }
  )
}