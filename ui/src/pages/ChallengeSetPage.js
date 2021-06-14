import useFetchAuth from "../useFetchAuth";
import Button from "@material-ui/core/Button";
import Spinner from "../components/Spinner";

export default function ChallengeSetPage({ match }) {
  const csSlug = match.params["cs_slug"];
  const { data: challenges, loading, error } = useFetchAuth(
    `/api/challenge-sets/${csSlug}/challenges`
  );

  if (loading) {
    return <Spinner />;
  }

  function startEnv(csSlug, cSlug) {
    console.log(`${csSlug},${cSlug}`);
  }

  return (
    <table>
      <tr>
        <th>Name</th>
        <th>Actions</th>
      </tr>

      {challenges.map((challenge) => {
        return (
          <tr>
            <td>{challenge.name}</td>
            <td>
              <Button
                variant="contained"
                onClick={() => {
                  startEnv(csSlug, challenge.slug);
                }}
              >
                Start
              </Button>
            </td>
          </tr>
        );
      })}
    </table>
  );
}
