import { Fixture } from "api/api-football/models/fixture";
import './diretta-row.css'
import { config } from 'appConfig';
import Image from 'next/image';

export default function DirettaRow(fixture: Fixture) {
    return (
        <div className="diretta-row grid items-center" style={{ gridTemplateColumns: '10% 10% 40% 40%' }}>
            <div>⭐️</div>
            <div>{fixture.fixture.status.short}</div>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                        <Image
                            src={fixture.teams.home.logo}
                            alt={fixture.teams.home.name}
                            width={20}
                            height={20}
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL={config.blurDataUrlAPISort}
                        />
                        <p>{fixture.teams.home.name}</p>
                    </div>
                    <p>{fixture.goals.home}</p>
                </div>
                <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                        <Image
                            src={fixture.teams.away.logo}
                            alt={fixture.teams.away.name}
                            width={20}
                            height={20}
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL={config.blurDataUrlAPISort}
                        />
                        <p>{fixture.teams.away.name}</p>

                    </div>
                    <p>{fixture.goals.away}</p>
                </div>
            </div>
            <div className={`flex justify-center items-center ${fixture.fixture.status.short === 'NS' ? 'flex-col' : ''}`}>
                {fixture.fixture.status.short === 'NS' && <p>partita in corso</p>}
            </div>
        </div>
    );
}