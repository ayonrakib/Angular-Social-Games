import PublicUser from './User';
export default class Voters {
  constructor(
    public yesVoters: PublicUser[],
    public noVoters: PublicUser[],
    public maybeVoters: PublicUser[]
  ) {}
}
