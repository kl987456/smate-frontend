import { gql, useMutation } from "@apollo/client";

const CLOCK_IN = gql`
  mutation ClockIn($locationId: Int!, $lat: Float!, $lng: Float!, $note: String) {
    clockIn(locationId: $locationId, lat: $lat, lng: $lng, note: $note) {
      id
      type
      timestamp
      location {
        name
      }
    }
  }
`;

export default function TestClockIn() {
  const [clockIn, { data, loading, error }] = useMutation(CLOCK_IN);

  const handleClick = async () => {
    try {
      await clockIn({
        variables: {
          locationId: 1,
          lat: 40.7128,
          lng: -74.006,
          note: "Test clock-in",
        },
      });
    } catch (err) {
      console.error("Clock-in failed:", err);
    }
  };

  return (
    <div>
      <button onClick={handleClick} disabled={loading}>
        Clock In
      </button>
      {error && <p style={{ color: "red" }}>{error.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
