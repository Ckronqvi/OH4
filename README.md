# OH4
Reactilla ja Springillä tehty verkkokauppa.

## Ominaisuudet:
* Käyttäjätilin luominen
* Sisäänkirjautuminen ja JWT session hallinta
* Ilmoituksien selaaminenen ja lisääminen

## Mitä tarvitset:
* JDK 17+
* Maven
* Node.js
* npm
* MySQL

## Kuinka käynnistää:
### Backend:
* ***src/main/resources/application.properties*** tiedostoon MySQL tietokannan sijainti ja käyttäjätunnukset
* ***src/main/resources/application.properties*** tiedostoon kuvat-kansion sijainti. Esim. \Desktop\kuvat\
* `mvn clean package`
* `java -jar demo-0.0.1-SNAPSHOT.jar`

### Frontend:
* `npm install`
* `npm start`
