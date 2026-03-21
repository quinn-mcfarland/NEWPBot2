#ifndef CMDRCLASS_H
#define CMDRCLASS_H

#include <string>

class cmdrClass {
private:
	std::string cmdrName;
	std::string rank;
protected:
	int bonds;
	int bounties;
	int exploration;
	float warEffort;
	int influence;
	int installationDefense;
	int murder;
	int paxFails;
	int warband;
	int blackMarket;
public:
	// Constructor and Destructor Functions
	cmdrClass();
	//~cmdrClass();
	// Overloaded I/O operators
	friend std::ostream &operator<<(std::ostream &out, const cmdrClass& c);
	friend std::istream &operator>>(std::istream &in, cmdrClass& c);
	// Accessors
	std::string getCmdrName() const { return cmdrName; }
	std::string getRank() const { return rank; }
	int getBonds() const { return bonds; }
	int getBounties() const { return bounties; }
	int getExploration() const { return exploration; }
	float getWarEffort() const { return warEffort; }
	int getInfluence() const { return influence; }
	int getInstallationDefense() const{ return installationDefense; }
	int getMurder() const { return murder; }
	int getPaxFails() const { return paxFails; }
	int getWarband() const { return warband; }
	int getBlackMarket() const { return blackMarket; }
	// Mutators
	void setCmdrName(std::string data) { cmdrName = data; }
	void setRank(std::string data) { rank = data; }
	void setBonds(int data) { bonds = data; }
	void setBounties(int data) { bounties = data; }
	void setExploration(int data) { exploration = data; }
	void setWarEffort(float data) { warEffort = data; }
	void setInfluence(int data) { influence = data; }
	void setInstallationDefense(int data) { installationDefense = data; }
	void setMurder(int data) { murder = data; }
	void setPaxFails(int data) { paxFails = data; }
	void setWarband(int data) { warband = data; }
	void setBlackMarket(int data) { blackMarket = data; }
	// Miscellaneous Member Functions
};

#endif //CMDRCLASS_H
