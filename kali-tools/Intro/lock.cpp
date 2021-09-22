#include <iostream>
using namespace std;
int main() {
    char a = 'S';
    char n = 'a';
    char s = 't';
    char w = 'u';
    char e = 'r';
    char r = 'n';
    string Key = "racecar", x;
    while(1)
    {
        cout << "Please Enter The Password\n";
        cin >> x;

        if(x == Key)
        {
            cout << "Success: File Unlocked\n";
            cout << "Answer is " << a << n << s << w << e << r;
            return 0;
        }
        else{
            cout << "Failure: Incorrect Password\n";
        }
    }
}
